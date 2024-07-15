import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { env } from "../../../utils/enviroment";

interface IAdminToken {
    id: string;
    email: string;
    token?: string;
}

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

        if (!admin) {
            throw new AppError("Password or email is not valid", 400);
        }

        const { id, email: emailAdmin, password: passwordHash } = admin;

        const isAuthenticated = await bcrypt.compare(password, passwordHash);

        if (!isAuthenticated) {
            throw new AppError("Password or email is not valid", 400);
        }

        const token = jwt.sign({ emailAdmin, id }, env.JWT_SECRET);

        const adminToken: IAdminToken = {
            email: emailAdmin,
            id,
            token,
        };

        return adminToken;
    }
}

export { LoginAdminUseCase };
