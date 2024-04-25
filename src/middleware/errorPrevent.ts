import { type NextFunction, type Request, type Response } from "express";

import { AppError } from "../errors/AppErros";

function errorPrevent(
    Error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
): Response | undefined {
    if (Error instanceof AppError) {
        return response.status(Error.statusCode).json({
            message: Error.message,
        });
    }

    return response.status(500).json({
        message: Error.message,
        stack: Error.stack,
    });
}

export { errorPrevent };
