import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";

import { AppError } from "../errors/AppErros";

dotenv.config({
    path: path.resolve(__dirname, "..", "..", "..", "..", ".env.dev"),
});

function verifyToken(token: string): string | jwt.JwtPayload {
    if (!process.env.JWT_SECRET)
        throw new AppError("A key JWT_SECRET in dotenv is required ");

    const result = jwt.verify(token, process.env.JWT_SECRET);

    return result;
}

export { verifyToken };
