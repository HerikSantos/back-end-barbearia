import { type Request, type Response } from "express";

import { type ReadAdminUseCase } from "./ReadAdminUseCase";

class ReadAdminController {
    private readonly readAdminUseCase: ReadAdminUseCase;
    constructor(readAdminUseCase: ReadAdminUseCase) {
        this.readAdminUseCase = readAdminUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const admins = await this.readAdminUseCase.execute();

        return response.status(200).json(admins);
    }
}

export { ReadAdminController };
