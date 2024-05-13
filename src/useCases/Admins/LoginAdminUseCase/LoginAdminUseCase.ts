import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";

import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";

interface IAdminToken {
    id: string;
    email: string;
    token?: string;
}

dotenv.config({
    path: path.resolve(__dirname, "..", "..", "..", "..", ".env.dev"),
});

class LoginAdminUseCase {
    private readonly adminRepository: IAdminsRepository;
    constructor(adminRepository: IAdminsRepository) {
        this.adminRepository = adminRepository;
    }

    async execute({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<IAdminToken> {
        const admin = await this.adminRepository.findOne({ email });

        if (!admin) throw new AppError("Password or email is not valid", 400);

        const { id, email: emailAdmin, password: passwordHash } = admin;

        const isAuthenticated = await bcrypt.compare(password, passwordHash);

        if (!isAuthenticated)
            throw new AppError("Password or email is not valid", 400);

        if (!process.env.JWT_SECRET)
            throw new Error("A key JWT_SECRET in dotenv is required ");

        const token = jwt.sign({ emailAdmin, id }, process.env.JWT_SECRET);

        const adminToken: IAdminToken = {
            email: emailAdmin,
            id,
            token,
        };

        return adminToken;
    }
}

export { LoginAdminUseCase };
