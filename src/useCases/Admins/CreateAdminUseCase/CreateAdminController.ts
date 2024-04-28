import { type Request, type Response } from "express";

import { type CreateAdminUseCase } from "./CreateAdminUseCase";

class CreateAdminController {
    private readonly createAdminUseCase: CreateAdminUseCase;
    constructor(createAdminUseCase: CreateAdminUseCase) {
        this.createAdminUseCase = createAdminUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        await this.createAdminUseCase.execute({
            name,
            email,
            password,
        });

        return response.status(201).send();
    }
}
export { CreateAdminController };
