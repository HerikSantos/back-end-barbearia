import { type Clientes } from "../../database/entities/Clientes";
import { type IClienteRepository } from "../../repositories/IClientesRepository";

interface IRequest {
    id?: string;
    name?: string;
    data_nasc?: string;
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
        const newClient = await this.clienteRepository.edit({
            id,
            name,
            data_nasc,
            qtd_cortes,
        });

        return newClient;
    }
}

export { UpdateClienteUseCase };
