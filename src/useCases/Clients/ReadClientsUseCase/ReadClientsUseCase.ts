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
            const result = {} as {
                id: string;
                name: string;
                data_nasc: Date;
                qtd_cortes: number;
            };

            result.id = client.id;
            (result.name = client.name),
                (result.data_nasc = client.data_nasc),
                (result.qtd_cortes = client.qtd_cortes);

            return result;
        });
        return clientsFormated;
    }
}

export { ReadClientsUseCase };
