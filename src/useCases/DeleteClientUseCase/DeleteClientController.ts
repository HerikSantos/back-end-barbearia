import { type Request, type Response } from "express";

import { type DeleteClientUseCase } from "./DeleteClientUseCase";

class DeleteClientController {
    private readonly deleteClienteUseCase: DeleteClientUseCase;
    constructor(deleteClienteUseCase: DeleteClientUseCase) {
        this.deleteClienteUseCase = deleteClienteUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        await this.deleteClienteUseCase.execute(id);

        return response.status(200).send();
    }
}

export { DeleteClientController };
