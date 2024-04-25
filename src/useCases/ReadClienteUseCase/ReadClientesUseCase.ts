import { type Clientes } from "../../database/entities/Clientes";
import { type IClienteRepository } from "../../repositories/IClientesRepository";

class ReadClientesUseCase {
    private readonly clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async execute({ name }: { name?: string }): Promise<Clientes[] | Clientes> {
        const clientes = await this.clienteRepository.findLike({
            name,
        });
        return clientes;
    }
}

export { ReadClientesUseCase };
