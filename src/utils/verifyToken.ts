import jwt from "jsonwebtoken";

import { env } from "./enviroment";

function verifyToken(token: string): string | jwt.JwtPayload {
    const result = jwt.verify(token, env.JWT_SECRET);

    return result;
}

export { verifyToken };
