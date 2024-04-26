import { type Clientes } from "../../../database/entities/Clientes";
import { AppError } from "../../../errors/AppErros";
import { type IClienteRepository } from "../../../repositories/IClientesRepository";

interface IRequest {
    id: string;
    name?: string;
    data_nasc?: Date;
    qtd_cortes?: number;
}

class UpdateClienteUseCase {
    private readonly clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async execute({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: IRequest): Promise<Clientes> {
        if (!id) throw new AppError("Client not found", 400);

        const newClient = await this.clienteRepository.edit({
            id,
            name,
            data_nasc,
            qtd_cortes,
        });
        if (!newClient) throw new AppError("Client not found", 400);

        return newClient;
    }
}

export { UpdateClienteUseCase };
