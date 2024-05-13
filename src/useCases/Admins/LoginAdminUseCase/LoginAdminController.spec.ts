import { type Request, type Response } from "express";

import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { CreateAdminUseCase } from "../CreateAdminUseCase/CreateAdminUseCase";
import { LoginAdminController } from "./LoginAdminController";
import { LoginAdminUseCase } from "./LoginAdminUseCase";

let adminRepository: AdminsRepositoryMemory;
let loginAdminUseCase: LoginAdminUseCase;
let loginAdminController: LoginAdminController;
let createAdminUseCase: CreateAdminUseCase;
describe("Login admin", () => {
    beforeEach(() => {
        adminRepository = new AdminsRepositoryMemory();
        loginAdminUseCase = new LoginAdminUseCase(adminRepository);
        loginAdminController = new LoginAdminController(loginAdminUseCase);
        createAdminUseCase = new CreateAdminUseCase(adminRepository);
    });

    it("Should be able to make login", async () => {
        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        const admin = {
            name: "teste da silva",
            email: "abcer2@gmail.com",
            password: "123abc",
        };

        mockRequest.body = admin;

        await createAdminUseCase.execute(admin);

        await loginAdminController.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
