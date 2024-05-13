import validator from "validator";

import { type Admins } from "../../../database/entities/Admins";
import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { cryptPassword } from "../../../utils/cryptPassword";

interface IRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}

class UpdateAdminUseCase {
    private readonly adminsRepository: IAdminsRepository;

    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute({ id, name, email, password }: IRequest): Promise<Admins> {
        if (!id) throw new AppError("Id is required");

        if (password) {
            password = await cryptPassword(password);
        }

        if (email) {
            if (!validator.isEmail(email))
                throw new AppError("Email is not valid", 400);
        }

        const editedAdmin = await this.adminsRepository.edit({
            id,
            name,
            email,
            password,
        });

        if (!editedAdmin) throw new AppError("Admin not found", 400);

        return editedAdmin;
    }
}

export { UpdateAdminUseCase };