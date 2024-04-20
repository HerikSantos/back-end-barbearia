import { type Request, type Response } from "express";

import { type UpdateClienteUseCase } from "./UpdateClienteUseCase";

class UpdateClienteController {
    private readonly updateClienteUseCase: UpdateClienteUseCase;

    constructor(updateClienteUseCase: UpdateClienteUseCase) {
        this.updateClienteUseCase = updateClienteUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, qtd_cortes, data_nasc } = request.body;
        const { id } = request.params;

        const newClient = await this.updateClienteUseCase.execute({
            id,
            name,
            data_nasc,
            qtd_cortes,
        });

        return response.status(200).json(newClient);
    }
}

export { UpdateClienteController };
