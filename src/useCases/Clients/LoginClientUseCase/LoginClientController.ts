import { type Response, type Request } from "express";

import { type LoginClientUseCase } from "./LoginClientUseCase";

class LoginClientController {
    private readonly loginClientUseCase: LoginClientUseCase;

    constructor(loginClientUseCase: LoginClientUseCase) {
        this.loginClientUseCase = loginClientUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, data_nasc }: { name: string; data_nasc: Date } =
            request.body;

        const clientLoged = await this.loginClientUseCase.execute({
            name,
            data_nasc,
        });

        return response.status(200).json(clientLoged);
    }
}

export { LoginClientController };
