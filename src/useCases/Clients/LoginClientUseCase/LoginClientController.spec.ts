/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response } from "express";

import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { LoginClientController } from "./LoginClientController";
import { LoginClientUseCase } from "./LoginClientUseCase";

let clientRepositoryMemory: ClientsRepositoryMemory;
let loginClientController: LoginClientController;
let loginClientUseCase: LoginClientUseCase;

describe("Login client", () => {
    beforeEach(() => {
        clientRepositoryMemory = new ClientsRepositoryMemory();
        loginClientUseCase = new LoginClientUseCase(clientRepositoryMemory);
        loginClientController = new LoginClientController(loginClientUseCase);
    });

    it("Should be able to login client", async () => {
        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        const client = {
            name: "teste da silva",
            data_nasc: new Date("2001-02-20"),
            qtd_cortes: 2,
        };

        mockRequest.body = client;

        await clientRepositoryMemory.create(client);

        await loginClientController.handle(mockRequest, mockResponse);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
