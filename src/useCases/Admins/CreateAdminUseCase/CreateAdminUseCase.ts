import validator from "validator";

import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { cryptPassword } from "../../../utils/cryptPassword";

class CreateAdminUseCase {
    private readonly adminsRepository: IAdminsRepository;
    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute({
        name,
        email,
        password,
    }: {
        name: unknown;
        email: unknown;
        password: unknown;
    }): Promise<void> {
        if (!name || !email || !password) {
            throw new AppError("Missing data", 400);
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            throw new AppError("Invalid type data", 400);
        }

        if (!validator.isEmail(email))
            throw new AppError("Email is not valid", 400);

        const existedAdmin = await this.adminsRepository.findOne({ email });

        if (existedAdmin) throw new AppError("Email is not valid", 400);

        const hashedPassword = await cryptPassword(password);

        await this.adminsRepository.create({
            name,
            email,
            password: hashedPassword,
        });
    }
}
export { CreateAdminUseCase };
