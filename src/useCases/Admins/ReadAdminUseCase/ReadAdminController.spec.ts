import { type Request, type Response } from "express";

import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { ReadAdminController } from "./ReadAdminController";
import { ReadAdminUseCase } from "./ReadAdminUseCase";

describe("List admins", () => {
    const adminsRepository = new AdminsRepositoryMemory();
    const readAdminUseCase = new ReadAdminUseCase(adminsRepository);
    const readAdminController = new ReadAdminController(readAdminUseCase);

    it("List all clients", async () => {
        const mockRequest = {} as Request;
        const mockResponse = {} as Response;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        await readAdminController.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
