/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Response, type Request } from "express";

import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { CreateClienteController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let createClientUseCase: CreateClientUseCase;
let createClienteController: CreateClienteController;

describe("Create client", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        createClientUseCase = new CreateClientUseCase(clientsRepositoryMemory);
        createClienteController = new CreateClienteController(
            createClientUseCase,
        );
    });

    const mockRequest = {} as Request;

    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnThis();
    mockResponse.send = jest.fn();

    it("Should be possible create client", async () => {
        mockRequest.body = {
            name: "ticoteste",
            data_nasc: "2001-04-22",
            qtd_cortes: 2,
        };

        await createClienteController.handle(mockRequest, mockResponse);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it("Should be not possible create client without all data", async () => {
        await expect(async () => {
            mockRequest.body = {
                name: "ticoteste",
                data_nasc: "2001-04-22",
                // qtd_cortes: 2,
            };

            await createClienteController.handle(mockRequest, mockResponse);
        }).rejects.toBeInstanceOf(AppError);
    });
});
