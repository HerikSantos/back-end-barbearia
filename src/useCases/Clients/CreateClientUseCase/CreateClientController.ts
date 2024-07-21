import { type Request, type Response } from "express";

import { type CreateClientUseCase } from "./CreateClientUseCase";

class CreateClienteController {
    private readonly createClientUseCase: CreateClientUseCase;

    constructor(createClientUseCase: CreateClientUseCase) {
        this.createClientUseCase = createClientUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, qtd_cortes, data_nasc } = request.body;

        await this.createClientUseCase.execute(name, data_nasc, qtd_cortes);

        return response.status(201).send();
    }
}

export { CreateClienteController };
