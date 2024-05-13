import { Router } from "express";

import { verifyTokenUseCase } from "../useCases/Token/VerifyTokenUseCase";
import { VerifyTokenController } from "../useCases/Token/VerifyTokenUseCase/VerifyTokenController";

const routeToken = Router();

const verifyTokenController = new VerifyTokenController(verifyTokenUseCase);

routeToken.post("/token", async (request, response) => {
    await verifyTokenController.handle(request, response);
});

export { routeToken };
