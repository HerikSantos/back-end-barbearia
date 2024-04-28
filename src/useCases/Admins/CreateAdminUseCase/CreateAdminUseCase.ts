import validator from "validator";

import { AppError } from "../../../errors/AppErros";
import {
    type IAdminsRepository,
    type IRequestAdmin,
} from "../../../repositories/IAdminsRepository";
import { cryptPassword } from "../../../utils/cryptPassword";

class CreateAdminUseCase {
    private readonly adminsRepository: IAdminsRepository;
    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute({ name, email, password }: IRequestAdmin): Promise<void> {
        if (!validator.isEmail(email))
            throw new AppError("Email is not valid", 400);

        const existedAdmin = await this.adminsRepository.findOne({ email });

        if (existedAdmin) throw new AppError("Email is not valid", 400);

        password = await cryptPassword(password);

        await this.adminsRepository.create({ name, email, password });
    }
}
export { CreateAdminUseCase };
