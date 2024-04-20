import { type Request, type Response } from "express";

import { type CreateClienteUseCase } from "./CreateClienteUseCase";

class CreateClienteController {
    private readonly createClienteUseCase: CreateClienteUseCase;

    constructor(createClienteUseCase: CreateClienteUseCase) {
        this.createClienteUseCase = createClienteUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, qtd_cortes, data_nasc } = request.body;

        if (!data_nasc || !name || !qtd_cortes) throw new Error("Missing data");

        await this.createClienteUseCase.execute({
            name,
            data_nasc,
            qtd_cortes,
        });

        return response.status(201).send();
    }
}

export { CreateClienteController };
