import { type NextFunction, type Request, type Response } from "express";

import { AdminsRepository } from "../repositories/AdminsRepository";
import { verifyToken } from "../utils/verifyToken";

interface IResponseAdmin {
    id: string;
    name: string;
    emailAdmin: string;
    password: string;
    iat: number;
    exp: number;
}

async function auth(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<Response | undefined> {
    try {
        const adminRepository = new AdminsRepository();

        const { authorization } = request.headers;

        if (!authorization)
            return response.status(401).json("Token is required");
        const [, token] = authorization.split(" ");

        const { emailAdmin } = verifyToken(token) as IResponseAdmin;

        if (!emailAdmin)
            return response.status(401).json("Token is not valid ");

        const result = await adminRepository.findOne({ email: emailAdmin });

        if (!result) return response.status(401).json("Token is not valid ");

        next();
    } catch (error) {
        return response.status(401).json("Token is not valid ");
    }
}

export { auth };
