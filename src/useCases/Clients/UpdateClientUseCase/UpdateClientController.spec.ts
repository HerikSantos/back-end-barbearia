/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { UpdateClientController } from "./UpdateClientController";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let updateClientUseCase: UpdateClientUseCase;
let updateClientController: UpdateClientController;

describe("Edit client", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        updateClientUseCase = new UpdateClientUseCase(clientsRepositoryMemory);
        updateClientController = new UpdateClientController(
            updateClientUseCase,
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

        await clientsRepositoryMemory.create(client);

        const createdClient = await clientsRepositoryMemory.findOne(client);

        if (createdClient) {
            mockRequest.params = {
                id: createdClient.id,
            };

            mockResponse.status = jest.fn().mockReturnThis();

            await updateClientController.handle(mockRequest, mockResponse);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
