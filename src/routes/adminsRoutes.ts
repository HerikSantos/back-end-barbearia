/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { createAdminUseCase } from "../useCases/Admins/CreateAdminUseCase";
import { CreateAdminController } from "../useCases/Admins/CreateAdminUseCase/CreateAdminController";
import { deleteAdminUseCase } from "../useCases/Admins/DeleteAdminUseCase";
import { DeleteAdminController } from "../useCases/Admins/DeleteAdminUseCase/DeleteAdminController";
import { readAdminUseCase } from "../useCases/Admins/ReadAdminUseCase";
import { ReadAdminController } from "../useCases/Admins/ReadAdminUseCase/ReadAdminController";
import { updateAdminUseCase } from "../useCases/Admins/UpdateAdminUseCase";
import { UpdateAdminController } from "../useCases/Admins/UpdateAdminUseCase/UpdateAdminController";

const routeAdmin = Router();

const createAdminController = new CreateAdminController(createAdminUseCase);
const readAdminController = new ReadAdminController(readAdminUseCase);
const updateAdminController = new UpdateAdminController(updateAdminUseCase);
const deleteAdminController = new DeleteAdminController(deleteAdminUseCase);

routeAdmin.post("/admin", async (request, response) => {
    await createAdminController.handle(request, response);
});

routeAdmin.get("/admin", async (request, response) => {
    await readAdminController.handle(request, response);
});

routeAdmin.put("/admin", async (request, response) => {
    await updateAdminController.handle(request, response);
});

routeAdmin.delete("/admin", async (request, response) => {
    await deleteAdminController.handle(request, response);
});

export { routeAdmin };
