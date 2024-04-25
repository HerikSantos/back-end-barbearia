import { AppError } from "../../errors/AppErros";
import {
    type IClienteRepository,
    type IRequest,
} from "../../repositories/IClientesRepository";

class CreateClienteUseCase {
    private readonly clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async execute({ name, data_nasc, qtd_cortes }: IRequest): Promise<void> {
        if (!data_nasc || !name || !qtd_cortes)
            throw new AppError("Missing data", 400);

        const clintExists = await this.clienteRepository.findOne({
            name,
            data_nasc,
        });

        if (clintExists) throw new AppError("Client already exists", 400);

        await this.clienteRepository.create({ name, data_nasc, qtd_cortes });
    }
}

export { CreateClienteUseCase };
