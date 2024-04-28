import { type Request, type Response } from "express";

import { type DeleteAdminUseCase } from "./DeleteAdminUseCase";

class DeleteAdminController {
    constructor(private readonly deleteAdminUseCase: DeleteAdminUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        await this.deleteAdminUseCase.execute({ id });

        return response.status(200).send();
    }
}

export { DeleteAdminController };
