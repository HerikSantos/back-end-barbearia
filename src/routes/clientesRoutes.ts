/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { auth } from "../middleware/authenticateMiddleware";
import { createClientUseCase } from "../useCases/Clients/CreateClientUseCase";
import { CreateClienteController } from "../useCases/Clients/CreateClientUseCase/CreateClientController";
import { deleteClienteUseCase } from "../useCases/Clients/DeleteClientUseCase";
import { DeleteClientController } from "../useCases/Clients/DeleteClientUseCase/DeleteClientController";
import { loginClientUseCase } from "../useCases/Clients/LoginClientUseCase";
import { LoginClientController } from "../useCases/Clients/LoginClientUseCase/LoginClientController";
import { readClientesUseCase } from "../useCases/Clients/ReadClientsUseCase";
import { ReadClientsController } from "../useCases/Clients/ReadClientsUseCase/ReadClientsController";
import { updateClientUseCase } from "../useCases/Clients/UpdateClientUseCase";
import { UpdateClientController } from "../useCases/Clients/UpdateClientUseCase/UpdateClientController";

const route = Router();
const createClienteController = new CreateClienteController(
    createClientUseCase,
);
const updateClientController = new UpdateClientController(updateClientUseCase);

const readClientsController = new ReadClientsController(readClientesUseCase);

const deleteClientController = new DeleteClientController(deleteClienteUseCase);

const loginClientController = new LoginClientController(loginClientUseCase);

route.post("/clientes", auth, async (request, response) => {
    await createClienteController.handle(request, response);
});

route.put("/clientes/:id", auth, async (request, response) => {
    await updateClientController.handle(request, response);
});

route.get("/clientes", auth, async (request, response) => {
    await readClientsController.handle(request, response);
});

route.delete("/clientes/:id", auth, async (request, response) => {
    await deleteClientController.handle(request, response);
});

route.post("/clientes/login", async (request, response) => {
    await loginClientController.handle(request, response);
});

export { route };
