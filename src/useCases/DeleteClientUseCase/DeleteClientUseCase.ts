import { AppError } from "../../errors/AppErros";
import { type IClienteRepository } from "../../repositories/IClientesRepository";

class DeleteClientUseCase {
    private readonly clientRepository: IClienteRepository;
    constructor(clientRepository: IClienteRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(id: string): Promise<void> {
        const clientExists = await this.clientRepository.findByID(id);

        if (!clientExists) throw new AppError("Client not found", 400);

        await this.clientRepository.delete(clientExists.id);
    }
}

export { DeleteClientUseCase };
