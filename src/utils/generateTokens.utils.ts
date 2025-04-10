import { TokenPayloadInterface } from "../interfaces/TokenPayload.interface.js"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ApiError } from "./customNextError.utils.js";

export const generateAccessToken = (userId: string):string => {
    const payload:TokenPayloadInterface = {userId};
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    return accessToken;
}

export const generateRefreshToken = (userId: string):string => {
    const payload:TokenPayloadInterface = {userId};
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
    return refreshToken;
}

export const verifyAccessToken = (token: string):string => {
    
    try {
        const decoded:TokenPayloadInterface = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenPayloadInterface;
        return decoded.userId;
        
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            throw new ApiError("Access Token Expired", 401);
        }   
    }
}

export const verifyRefreshToken = (token:string):string => {
    try {
        const decoded:TokenPayloadInterface = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as TokenPayloadInterface;
        return decoded.userId;
    } catch (error) {
        
        if(error instanceof jwt.TokenExpiredError){
            throw new ApiError("Session expired please login again", 401);
        }

        else if (error instanceof jwt.JsonWebTokenError){
            throw new ApiError("Invalid Token, Please Login Again", 401)
        }
        
        else{
            throw new ApiError(error.message, 401);

        }
    }
}