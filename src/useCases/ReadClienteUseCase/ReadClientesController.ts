import { type Request, type Response } from "express";

import { AppError } from "../../errors/AppErros";
import { type ReadClientesUseCase } from "./ReadClientesUseCase";

class ReadClientesController {
    private readonly readClientesUseCase: ReadClientesUseCase;
    constructor(readClientesUseCase: ReadClientesUseCase) {
        this.readClientesUseCase = readClientesUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, data_nasc }: { name: string; data_nasc: string } =
            request.body;

        if (!name && !data_nasc) throw new AppError("Error", 400);

        const clientes = await this.readClientesUseCase.execute({
            name,
            data_nasc,
        });

        return response.json(clientes);
    }
}

export { ReadClientesController };
