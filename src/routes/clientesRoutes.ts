/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { createClienteUseCase } from "../useCases/Clients/CreateClienteUseCase";
import { CreateClienteController } from "../useCases/Clients/CreateClienteUseCase/CreateClienteController";
import { deleteClienteUseCase } from "../useCases/Clients/DeleteClientUseCase";
import { DeleteClientController } from "../useCases/Clients/DeleteClientUseCase/DeleteClientController";
import { readClientesUseCase } from "../useCases/Clients/ReadClienteUseCase";
import { ReadClientesController } from "../useCases/Clients/ReadClienteUseCase/ReadClientesController";
import { updateClienteUseCase } from "../useCases/Clients/UpdateClienteUseCase";
import { UpdateClienteController } from "../useCases/Clients/UpdateClienteUseCase/UpdateClienteController";

const route = Router();
const createClienteController = new CreateClienteController(
    createClienteUseCase,
);
const updateClienteController = new UpdateClienteController(
    updateClienteUseCase,
);

const readClientesController = new ReadClientesController(readClientesUseCase);

const deleteClientController = new DeleteClientController(deleteClienteUseCase);

route.post("/clientes", async (request, response) => {
    await createClienteController.handle(request, response);
});

route.put("/clientes/:id", async (request, response) => {
    await updateClienteController.handle(request, response);
});

route.get("/clientes", async (request, response) => {
    await readClientesController.handle(request, response);
});

route.delete("/clientes", async (request, response) => {
    await deleteClientController.handle(request, response);
});

export { route };
