import { type Request, type Response } from "express";

import { verifyToken } from "../../../utils/verifyToken";
import { type VerifyTokenUseCase } from "./VerifyTokenUseCase";

interface IRequest {
    emailAdmin: string;
    qtd_cortes: number;
}

class VerifyTokenController {
    private readonly verifyTokenUseCase: VerifyTokenUseCase;

    constructor(verifyTokenUseCase: VerifyTokenUseCase) {
        this.verifyTokenUseCase = verifyTokenUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { token }: { token: string } = request.body;

        try {
            const result = verifyToken(token) as IRequest;

            const { emailAdmin } = result;

            if (emailAdmin) {
                await this.verifyTokenUseCase.verifyTokenAdmin(token);

                return response.json(true);
            }

            await this.verifyTokenUseCase.verifyTokenClient(token);
            return response.json(true);
        } catch (err) {
            return response.json(false);
        }
    }
}

export { VerifyTokenController };
