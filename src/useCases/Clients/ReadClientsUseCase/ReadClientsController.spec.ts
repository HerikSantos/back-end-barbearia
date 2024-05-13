/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { ReadClientsController } from "./ReadClientsController";
import { ReadClientsUseCase } from "./ReadClientsUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let readClientesUseCase: ReadClientsUseCase;
let readClientsController: ReadClientsController;

describe("List all clients", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        readClientesUseCase = new ReadClientsUseCase(clientsRepositoryMemory);
        readClientsController = new ReadClientsController(readClientesUseCase);
    });
    it("Should be possible list all clients", async () => {
        const mockRequest = {} as Request;

        const mockResponse = {} as Response;
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        await readClientsController.handle(mockRequest, mockResponse);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
