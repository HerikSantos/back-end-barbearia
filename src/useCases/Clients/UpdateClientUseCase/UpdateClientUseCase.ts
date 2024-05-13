import { type Clientes } from "../../../database/entities/Clientes";
import { AppError } from "../../../errors/AppErros";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";

interface IRequest {
    id: string;
    name?: string;
    data_nasc?: Date;
    qtd_cortes?: number;
}

class UpdateClientUseCase {
    private readonly clientsRepository: IClientsRepository;

    constructor(clientsRepository: IClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    async execute({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: IRequest): Promise<Clientes> {
        if (!id) throw new AppError("Id is required", 400);

        const newClient = await this.clientsRepository.edit({
            id,
            name,
            data_nasc,
            qtd_cortes,
        });
        if (!newClient) throw new AppError("Client not found", 400);

        return newClient;
    }
}

export { UpdateClientUseCase };
