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
        data_nasc: string;
    }): Promise<IClientToken> {
        if (typeof name !== "string" || typeof data_nasc !== "string") {
            throw new AppError("Invalid type or missing data", 400);
        }

        if (!data_nasc || !name) {
            throw new AppError("Missing data", 400);
        }

        const client = await this.clientRepository.findOne({
            name,
            data_nasc: new Date(data_nasc),
        });

        if (!client) {
            throw new AppError("Username or birthday is incorrect");
        }

        const tokenClient = {
            id: client.id,
            name: client.name,
            data_nasc: new Date(data_nasc),
        };

        const token = jwt.sign(tokenClient, env.JWT_SECRET, {
            expiresIn: "7D",
        });

        return { ...tokenClient, token };
    }
}

export { LoginClientUseCase };
