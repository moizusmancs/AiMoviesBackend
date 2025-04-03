import { TokenPayloadInterface } from "../interfaces/TokenPayload.interface.js"
import jwt from "jsonwebtoken"

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