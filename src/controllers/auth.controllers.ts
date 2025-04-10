import { ZodError } from "zod";
import { ApiError } from "../utils/customNextError.utils.js";
import { TryCatchUtily } from "../utils/tryCatch.utils.js";
import { IUser, User } from "../models/user.model.js";
import { generateHashPasswordUtility } from "../utils/generateHashPassword.utils.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/generateTokens.utils.js";
import { generateVerificationCodeUtility } from "../utils/generateVerificationCode.utils.js";
import { sendVerificationEmail } from "../utils/sendVerificationCodeEmail.js";
import { CookieOptions } from "express";

export const handleSignUpUser = TryCatchUtily (async (req,res,next) => {
    
    const {firstName, lastName, userName, email, password, profilePictureUrl} = req.body;

    const userAlreadyExists = await User.findOne({email,userName});

    if(userAlreadyExists){
        throw new ApiError("An account with this email/username already exists, please login", 400);
    }

    const hashedPassword = await generateHashPasswordUtility(password);
    const verificationCode = generateVerificationCodeUtility();

    const newUser:IUser = await User.create({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        profilePictureUrl,
        verificationCode
    })

    const accessToken = generateAccessToken(newUser._id as string);
    const refreshToken = generateRefreshToken(newUser._id as string);

    newUser.refreshToken = refreshToken;

    await newUser.save();
    newUser.password = undefined;

    // await sendVerificationEmail(email, verificationCode);

    res
        .setHeader("Authorization",`Bearer ${accessToken}`)
        .status(201)
        .cookie("refreshToken",refreshToken)
        .json({
            success: true,
            message: "user created successfully and email verification code sent",
            user:newUser
        })
})

export const handleLoginUser = TryCatchUtily(async (req, res, next) => {

    const { username, email, password } = req.body;

    if(!username || !password || !email){
        throw new ApiError("username/email and password must be provided",400)
    }

    const userAlreadyExists = await User.findOne({email,username});

    if(!userAlreadyExists){
        throw new ApiError("no user exists with above credentials, please signup",400)
    }

    const isPasswordValid = await userAlreadyExists.comparePassword(password);

    if(!isPasswordValid){
        throw new ApiError("invalid password",401)
    }

    const accessToken = generateAccessToken(userAlreadyExists._id as string);
    const refreshToken = generateRefreshToken(userAlreadyExists._id as string);

    userAlreadyExists.refreshToken = refreshToken;
    await userAlreadyExists.save();


    const loggedInUser = await User.findById(userAlreadyExists._id as string).select(" -password -refreshToken")

    const options:CookieOptions = {
        httpOnly: true,
        secure:true,
        sameSite:"lax"
    }

    res
    .setHeader("Authorization",`Bearer ${accessToken}`)
    .status(200)
    .cookie("refreshToken",refreshToken, options)
    .json({
        success: true,
        message: "user logged in successfully",
        user: loggedInUser
    })

})

export const handleTest = TryCatchUtily(async(req,res,next) => {

    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(" ")[1];
    const validToken = verifyAccessToken(token);

    res.json({
        success: true,
        validToken
    })
})


export const handleRefreshToken = TryCatchUtily(async (req, res, next) => {
    

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError("Unauthorized Request", 401);
    }

    const token = verifyRefreshToken(incomingRefreshToken);

    const user = await User.findById(token as string).select("-password");

    if(!user){
        throw new ApiError("User not found, invalid refreshtoken",401);
    }

    const accessToken = generateAccessToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);

    user.refreshToken = refreshToken;
    await user.save();

    const options:CookieOptions = {
        httpOnly: true,
        secure:true,
        sameSite:"lax"
    }

    res
    .setHeader("Authorization",`Bearer ${accessToken}`)
    .status(200)
    .cookie("refreshToken",refreshToken, options)
    .json({
        success: true,
        message: "Access and Refresh Tokens Refreshed Successfully!",
    })

})

