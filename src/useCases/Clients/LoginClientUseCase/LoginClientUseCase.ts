import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppErros";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { env } from "../../../utils/enviroment";

interface IClientToken {
    id: string;
    name: string;
    data_nasc: Date;
    token?: string;
}

class LoginClientUseCase {
    private readonly clientRepository: IClientsRepository;
    constructor(clientRepository: IClientsRepository) {
        this.clientRepository = clientRepository;
    }

    async execute({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: Date;
    }): Promise<IClientToken> {
        if (!name || !data_nasc) {
            throw new AppError("Missing data", 400);
        }

        const client = await this.clientRepository.findOne({ name, data_nasc });

        if (!client) {
            throw new AppError("Username or birthday is incorrect");
        }

        const tokenClient: IClientToken = {
            id: client.id,
            name: client.name,
            data_nasc: client.data_nasc,
        };

        const token = jwt.sign(tokenClient, env.JWT_SECRET, {
            expiresIn: "7D",
        });

        tokenClient.token = token;

        return tokenClient;
    }
}

export { LoginClientUseCase };
