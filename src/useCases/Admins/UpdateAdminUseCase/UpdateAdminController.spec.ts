import { type Request, type Response } from "express";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { UpdateAdminController } from "./UpdateAdminController";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

describe("Update admin", () => {
    const adminsRepository = new AdminsRepositoryMemory();
    const updateAdminsUseCase = new UpdateAdminUseCase(adminsRepository);
    const updateAdminController = new UpdateAdminController(
        updateAdminsUseCase,
    );
    it("Should be able update admin", async () => {
        const mockRequest = {} as Request;
        const mockResponse = {} as Response;

        mockRequest.body = {
            name: "teste da silva",
        };

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        const admin = {
            name: "teste",
            email: "tsete@gmail.com",
            password: "teste123",
        };

        await adminsRepository.create(admin);

        const createdAdmin = await adminsRepository.findOne(admin);

        if (!createdAdmin) throw new AppError("Error test update");

        mockRequest.params = {
            id: createdAdmin.id,
        };

        await updateAdminController.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
