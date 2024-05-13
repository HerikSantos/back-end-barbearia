import { AppError } from "../../../errors/AppErros";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";

class DeleteClientUseCase {
    private readonly clientRepository: IClientsRepository;
    constructor(clientRepository: IClientsRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(id: string): Promise<void> {
        const clientExists = await this.clientRepository.findByID(id);

        if (!clientExists) throw new AppError("Client not found", 400);

        await this.clientRepository.delete(clientExists.id);
    }
}

export { DeleteClientUseCase };
