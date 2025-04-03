import { NextFunction, Request, Response } from "express";
import { zodUserSchema } from "../validators/user.validation.js";
import { ZodError } from "zod";


export const validateSignupDataMiddleware = (req: Request,res:Response,next:NextFunction) => {

    const validationResult = zodUserSchema.safeParse(req.body);
    if(!validationResult.success){
        const error = new ZodError(validationResult.error.errors);
        return next(error);
    }
    req.body = validationResult.data;
    next();
}