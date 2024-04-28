import { type Request, type Response } from "express";

import { type UpdateAdminUseCase } from "./UpdateAdminUseCase";

class UpdateAdminController {
    private readonly updateAdminUseCase: UpdateAdminUseCase;
    constructor(updateAdminUseCase: UpdateAdminUseCase) {
        this.updateAdminUseCase = updateAdminUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const { id } = request.params;

        const editedAdmin = await this.updateAdminUseCase.execute({
            id,
            name,
            email,
            password,
        });

        return response.status(200).json(editedAdmin);
    }
}

export { UpdateAdminController };
