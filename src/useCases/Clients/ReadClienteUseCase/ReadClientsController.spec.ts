/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { ReadClientesController } from "./ReadClientesController";
import { ReadClientesUseCase } from "./ReadClientesUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let readClientesUseCase: ReadClientesUseCase;
let readClientesController: ReadClientesController;

describe("List all clients", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        readClientesUseCase = new ReadClientesUseCase(clienteRepositoryMemory);
        readClientesController = new ReadClientesController(
            readClientesUseCase,
        );
    });
    it("Should be possible list all clients", async () => {
        const mockRequest = {} as Request;

        const mockResponse = {} as Response;
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        await readClientesController.handle(mockRequest, mockResponse);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
