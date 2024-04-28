/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { createAdminUseCase } from "../useCases/Admins/CreateAdminUseCase";
import { CreateAdminController } from "../useCases/Admins/CreateAdminUseCase/CreateAdminController";

const route = Router();

const createAdminController = new CreateAdminController(createAdminUseCase);

route.post("/admin", async (request, response) => {
    await createAdminController.handle(request, response);
});

export { route };
