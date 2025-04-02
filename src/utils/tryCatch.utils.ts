import { NextFunction, Request, RequestHandler, Response } from "express"


export const TryCatchUtily = (givenFunction: RequestHandler):RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise
            .resolve(givenFunction(req,res,next))
            .catch(next)
    }
}