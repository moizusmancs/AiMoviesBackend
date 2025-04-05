import { ZodError } from "zod";
import { customNextError } from "../utils/customNextError.utils.js";
import { TryCatchUtily } from "../utils/tryCatch.utils.js";
import { IUser, User } from "../models/user.model.js";
import { generateHashPasswordUtility } from "../utils/generateHashPassword.utils.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.utils.js";
import { generateVerificationCodeUtility } from "../utils/generateVerificationCode.utils.js";
import { sendVerificationEmail } from "../utils/sendVerificationCodeEmail.js";

export const handleSignUpUser = TryCatchUtily (async (req,res,next) => {
    
    const {firstName, lastName, userName, email, password, profilePictureUrl} = req.body;

    const userAlreadyExists = await User.findOne({email,userName});

    if(userAlreadyExists){
        throw new customNextError("An account with this email/username already exists, please login", 400);
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
    await sendVerificationEmail(email, verificationCode);


    res.status(201).cookie("refreshToken",refreshToken).json({user:newUser, accessToken})

})