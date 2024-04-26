import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";

import { AppError } from "../../../errors/AppErros";
import { type IClienteRepository } from "../../../repositories/IClientesRepository";

interface IClientToken {
    name: string;
    data_nasc: Date;
    token?: string;
}

dotenv.config({
    path: path.resolve(__dirname, "..", "..", "..", "..", ".env.dev"),
});

class LoginClientUseCase {
    private readonly clientRepository: IClienteRepository;
    constructor(clientRepository: IClienteRepository) {
        this.clientRepository = clientRepository;
    }

    async execute({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: Date;
    }): Promise<IClientToken> {
        const client = await this.clientRepository.findOne({ name, data_nasc });

        if (!client) throw new AppError("Client not found");

        const tokenClient: IClientToken = {
            name: client.name,
            data_nasc: client.data_nasc,
        };

        if (!process.env.JWT_SECRET)
            throw new Error("A key JWT_SECRET in dotenv is required ");

        const token = jwt.sign(tokenClient, process.env.JWT_SECRET, {
            expiresIn: "7D",
        });

        tokenClient.token = token;

        return tokenClient;
    }
}

export { LoginClientUseCase };
