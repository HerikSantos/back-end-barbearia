import { type Request, type Response } from "express";

import { type LoginAdminUseCase } from "./LoginAdminUseCase";

class LoginAdminController {
    private readonly loginAdminUseCase: LoginAdminUseCase;

    constructor(loginAdminUseCase: LoginAdminUseCase) {
        this.loginAdminUseCase = loginAdminUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const adminToken = await this.loginAdminUseCase.execute({
            email,
            password,
        });

        return response.status(200).json(adminToken);
    }
}

export { LoginAdminController };
