import { type Clientes } from "../../database/entities/Clientes";
import { type IClienteRepository } from "../../repositories/IClientesRepository";

class ReadClientesUseCase {
    private readonly clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async execute({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: string;
    }): Promise<Clientes[] | Clientes> {
        const clientes = await this.clienteRepository.findLike({
            name,
            data_nasc,
        });
        return clientes;
    }
}

export { ReadClientesUseCase };
