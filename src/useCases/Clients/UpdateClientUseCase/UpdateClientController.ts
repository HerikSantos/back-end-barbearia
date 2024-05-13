import { type Request, type Response } from "express";

import { type UpdateClientUseCase } from "./UpdateClientUseCase";

class UpdateClientController {
    private readonly updateClientUseCase: UpdateClientUseCase;

    constructor(updateClientUseCase: UpdateClientUseCase) {
        this.updateClientUseCase = updateClientUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, qtd_cortes, data_nasc } = request.body;
        const { id } = request.params;

        const newClient = await this.updateClientUseCase.execute({
            id,
            name,
            data_nasc,
            qtd_cortes,
        });

        return response.status(200).json(newClient);
    }
}

export { UpdateClientController };
