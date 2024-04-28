import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";

class DeleteAdminUseCase {
    private readonly adminRepository: IAdminsRepository;
    constructor(adminRepository: IAdminsRepository) {
        this.adminRepository = adminRepository;
    }

    async execute({ id }: { id: string }): Promise<void> {
        if (!id) throw new AppError("Id is required", 400);

        const existedAdmin = await this.adminRepository.findByID(id);

        if (!existedAdmin) throw new AppError("Admin not found", 400);

        await this.adminRepository.delete(id);
    }
}

export { DeleteAdminUseCase };
