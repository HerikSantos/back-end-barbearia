import { type Request, type Response } from "express";

import { AppError } from "../../../errors/AppErros";
import { type ReadClientsUseCase } from "./ReadClientsUseCase";

class ReadClientsController {
    private readonly readClientesUseCase: ReadClientsUseCase;
    constructor(readClientesUseCase: ReadClientsUseCase) {
        this.readClientesUseCase = readClientesUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.query ?? "";

        if (typeof name !== "string" && typeof name !== "undefined") {
            throw new AppError("Invalid type", 400);
        }

        const clientes = await this.readClientesUseCase.execute({
            name,
        });

        return response.status(200).json(clientes);
    }
}

export { ReadClientsController };
