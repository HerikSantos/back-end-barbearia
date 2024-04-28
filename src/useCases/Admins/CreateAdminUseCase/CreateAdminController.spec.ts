import { type Request, type Response } from "express";

import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { CreateAdminController } from "./CreateAdminController";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

describe("Create admin", () => {
    it("Should be alble create a admin", async () => {
        const adminsRepository = new AdminsRepositoryMemory();
        const createAdminUseCase = new CreateAdminUseCase(adminsRepository);
        const createAdminController = new CreateAdminController(
            createAdminUseCase,
        );
        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.send = jest.fn();

        mockRequest.body = {
            name: "teste de jesus",
            email: "email@gmail.com",
            password: "1teste23",
        };

        await createAdminController.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
});
