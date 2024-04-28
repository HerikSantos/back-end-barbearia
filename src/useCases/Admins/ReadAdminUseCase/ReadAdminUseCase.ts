import { type Admins } from "../../../database/entities/Admins";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";

class ReadAdminUseCase {
    private readonly adminsRepository: IAdminsRepository;
    constructor(adminsRepository: IAdminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    async execute(): Promise<Admins | Admins[]> {
        const admins = await this.adminsRepository.findAll();

        return admins;
    }
}

export { ReadAdminUseCase };
