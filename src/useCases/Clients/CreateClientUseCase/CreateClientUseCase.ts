import { AppError } from "../../../errors/AppErros";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { isValidDate } from "../../../utils/dateValidator";

class CreateClientUseCase {
    private readonly clientsRepository: IClientsRepository;

    constructor(clientsRepository: IClientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    async execute(name, data_nasc, qtd_cortes): Promise<void> {
        if (
            typeof name !== "string" ||
            typeof data_nasc !== "string" ||
            typeof qtd_cortes !== "number"
        ) {
            throw new AppError("Invalid type or missing data", 400);
        }

        if (!data_nasc || !name || !qtd_cortes) {
            throw new AppError("Missing data", 400);
        }

        if (!isValidDate(data_nasc)) {
            throw new AppError("Invalid type date", 400);
        }

        const clintExists = await this.clientsRepository.findOne({
            name,
            data_nasc: new Date(data_nasc),
        });

        if (clintExists) {
            throw new AppError("Client already exists", 400);
        }

        await this.clientsRepository.create({
            name,
            data_nasc: new Date(data_nasc),
            qtd_cortes,
        });
    }
}

export { CreateClientUseCase };
