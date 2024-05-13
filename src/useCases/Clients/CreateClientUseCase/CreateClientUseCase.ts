import { AppError } from "../../../errors/AppErros";
import {
    type IClientsRepository,
    type IRequest,
} from "../../../repositories/IClientsRepository";

class CreateClientUseCase {
    private readonly clientsRepository: IClientsRepository;

    constructor(clientsRepository: IClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    async execute({ name, data_nasc, qtd_cortes }: IRequest): Promise<void> {
        if (!data_nasc || !name || !qtd_cortes)
            throw new AppError("Missing data", 400);

        const clintExists = await this.clientsRepository.findOne({
            name,
            data_nasc,
        });

        if (clintExists) throw new AppError("Client already exists", 400);

        await this.clientsRepository.create({ name, data_nasc, qtd_cortes });
    }
}

export { CreateClientUseCase };
