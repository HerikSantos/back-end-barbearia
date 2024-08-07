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
        if (password) {
            password = await cryptPassword(password);
        }

        if (email) {
            if (!validator.isEmail(email))
                throw new AppError("Email is not valid", 400);
        }

        const existedAdmin = await this.adminsRepository.findByID(id);

        if (!existedAdmin) {
            throw new AppError("ID is not valid", 400);
        }
        // eslint-disable-next-line
        const editedAdmin = (await this.adminsRepository.edit({
            id,
            name,
            email,
            password,
        })) as Admins;

        const result = {
            id: editedAdmin.id,
            name: editedAdmin.name,
            email: editedAdmin.email,
            password: editedAdmin.password,
        };

        return result;
    }
}

export { UpdateAdminUseCase };
