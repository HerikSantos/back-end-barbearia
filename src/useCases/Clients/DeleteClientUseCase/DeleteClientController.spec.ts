/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { CreateClienteUseCase } from "../CreateClienteUseCase/CreateClienteUseCase";
import { DeleteClientController } from "./DeleteClientController";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let createClientUseCase: CreateClienteUseCase;
let deleteClientController: DeleteClientController;
let deleteClientUseCase: DeleteClientUseCase;

describe("Delete client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        createClientUseCase = new CreateClienteUseCase(clienteRepositoryMemory);
        deleteClientUseCase = new DeleteClientUseCase(clienteRepositoryMemory);
        deleteClientController = new DeleteClientController(
            deleteClientUseCase,
        );
    });

    it("Should be possible delete a client", async () => {
        const client = {
            name: "test do santos",
            qtd_cortes: 2,
            data_nasc: new Date("2001-02-02"),
        };

        const mockRequest = {} as Request;

        const mockResponse = {} as Response;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.send = jest.fn();

        await createClientUseCase.execute(client);

        const createdClient = await clienteRepositoryMemory.findOne(client);

        if (createdClient && !Array.isArray(createdClient)) {
            mockRequest.params = {
                id: createdClient.id,
            };

            await deleteClientController.handle(mockRequest, mockResponse);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }
    });
});
