import { NextFunction, Request, Response } from "express";

interface CustomErrorInterface extends Error {
    statusCode: number
}

const errorHandlerMiddleware = (
    err: CustomErrorInterface,
    req: Request,
    res: Response,
    next: NextFunction
):void => {

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