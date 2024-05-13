import { type Clientes } from "../../../database/entities/Clientes";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";

class ReadClientsUseCase {
    private readonly clientsRepository: IClientsRepository;

    constructor(clientsRepository: IClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    async execute({ name }: { name?: string }): Promise<Clientes[] | Clientes> {
        const clientes = await this.clientsRepository.findLike({
            name,
        });
        return clientes;
    }
}

export { ReadClientsUseCase };
