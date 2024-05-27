import dotenv from "dotenv";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { CreateAdminUseCase } from "../../Admins/CreateAdminUseCase/CreateAdminUseCase";
import { LoginAdminUseCase } from "../../Admins/LoginAdminUseCase/LoginAdminUseCase";
import { VerifyTokenController } from "./VerifyTokenController";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";

let createAdminUseCase: CreateAdminUseCase;
let loginAdminUseCase: LoginAdminUseCase;
let verifyTokenUseCase: VerifyTokenUseCase;
let verifyTokenController: VerifyTokenController;
let adminsRepository: AdminsRepositoryMemory;

describe("Veirify token", () => {
    beforeEach(() => {
        adminsRepository = new AdminsRepositoryMemory();
        createAdminUseCase = new CreateAdminUseCase(adminsRepository);
        loginAdminUseCase = new LoginAdminUseCase(adminsRepository);
        verifyTokenUseCase = new VerifyTokenUseCase(adminsRepository);
        verifyTokenController = new VerifyTokenController(verifyTokenUseCase);
    });

    it("Should be able verify token", async () => {
        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        const admin = {
            name: "teste da silva",
            email: "abcer2@gmail.com",
            password: "123abc",
        };

        await createAdminUseCase.execute(admin);

        const adminCreated = await adminsRepository.findOne(admin);

        if (adminCreated) {
            const newAdmin = {
                id: adminCreated.id,
                name: "teste da silva",
                email: "abcer2@gmail.com",
                password: "123abc",
            };

            const { token } = await loginAdminUseCase.execute(newAdmin);

            mockRequest.body = { token };

            await verifyTokenController.handle(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith(true);
        }
    });

    it("It should be impossible to verify the token of a nonexistent admin", async () => {
        dotenv.config({
            path: path.resolve(
                __dirname,
                "..",
                "..",
                "..",
                "..",
                "..",
                ".env.dev",
            ),
        });

        const mockResponse = {} as Response;
        const mockRequest = {} as Request;

        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();

        const admin = {
            name: "teste da silva",
            emailAdmin: "abcer2@gmail.com",
            password: "123abc",
        };

        if (!process.env.JWT_SECRET)
            throw new AppError("A key JWT_SECRET in dotenv is required ");

        const token = jwt.sign(admin, process.env.JWT_SECRET);

        mockRequest.body = { token };

        await verifyTokenController.handle(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(false);
    });
});
