/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { UpdateClienteController } from "./UpdateClienteController";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let updateClienteUseCase: UpdateClienteUseCase;
let updateClienteController: UpdateClienteController;

describe("Edit client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        updateClienteUseCase = new UpdateClienteUseCase(
            clienteRepositoryMemory,
        );
        updateClienteController = new UpdateClienteController(
            updateClienteUseCase,
        );
    });

    it("Should be possible edit client", async () => {
        const mockRequest = {} as Request;

        const mockResponse = {} as Response;

        const client = {
            name: "tico",
            qtd_cortes: 2,
            data_nasc: new Date("2001-02-22"),
        };

        mockRequest.body = client;
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        await clienteRepositoryMemory.create(client);

        const createdClient = await clienteRepositoryMemory.findOne(client);

        if (createdClient) {
            mockRequest.params = {
                id: createdClient.id,
            };

            mockResponse.status = jest.fn().mockReturnThis();

            await updateClienteController.handle(mockRequest, mockResponse);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
