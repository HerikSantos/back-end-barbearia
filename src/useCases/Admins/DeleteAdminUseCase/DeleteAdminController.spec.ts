import { type Request, type Response } from "express";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { DeleteAdminController } from "./DeleteAdminController";
import { DeleteAdminUseCase } from "./DeleteAdminUseCase";

describe("Delete admin", () => {
    it("Should be able delete a admin", async () => {
        const adminsRepository = new AdminsRepositoryMemory();
        const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository);
        const deleteAdminController = new DeleteAdminController(
            deleteAdminUseCase,
        );

        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.send = jest.fn();

        const admin = {
            name: "teste",
            email: "tsete@gmail.com",
            password: "teste123",
        };

        await adminsRepository.create(admin);

        const createdAdmin = await adminsRepository.findOne(admin);

        if (!createdAdmin) throw new AppError("Error test delete");

        mockRequest.params = {
            id: createdAdmin.id,
        };

        await deleteAdminController.handle(mockRequest, mockResponse);
    });
});
