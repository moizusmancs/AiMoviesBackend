import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

interface CustomErrorInterface extends Error {
    statusCode: number
}

const errorHandlerMiddleware = (
    err: CustomErrorInterface | ZodError,
    req: Request,
    res: Response,
    next: NextFunction
):void => {

    if(err instanceof ZodError){
        res
        .status(400)
        .json({
            success: false,
            message: "Validation Error",
            errors: err.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message
            }))
        })
        return;
    }

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res
        .status(err.statusCode)
        .json({
            success: false,
            message: err.message
        })
}

export default errorHandlerMiddleware;