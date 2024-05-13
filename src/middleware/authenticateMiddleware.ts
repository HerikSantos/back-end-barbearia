import { type NextFunction, type Request, type Response } from "express";

import { verifyToken } from "../utils/verifyToken";

function auth(
    request: Request,
    response: Response,
    next: NextFunction,
): Response | undefined {
    try {
        const { authorization } = request.headers;

        if (!authorization)
            return response.status(401).json("Token is required");
        const [, token] = authorization.split(" ");

        verifyToken(token);
        next();
    } catch (error) {
        console.log(error);

        return response.status(401).json("Token is not valid ");
    }
}

export { auth };
