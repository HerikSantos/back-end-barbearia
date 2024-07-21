import { type Clientes } from "../../../database/entities/Clientes";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";

class ReadClientsUseCase {
    private readonly clientsRepository: IClientsRepository;

    constructor(clientsRepository: IClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    async execute({ name }: { name?: string }): Promise<Clientes[]> {
        const clients = await this.clientsRepository.findLike({
            name,
        });

        const clientsFormated = clients.map((client) => {
            const { createdAt, updateAt, ...formatedClient } = client;

            const result = Object.assign({}, formatedClient);

            return result;
        });
        return clientsFormated;
    }
}

export { ReadClientsUseCase };
