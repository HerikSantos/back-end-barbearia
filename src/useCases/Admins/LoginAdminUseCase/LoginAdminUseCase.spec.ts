import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { env } from "../../../utils/enviroment";
import { LoginAdminUseCase } from "./LoginAdminUseCase";

interface ISutTypes {
    sut: LoginAdminUseCase;
    adminsRepository: IAdminsRepository;
}

function makeSut(): ISutTypes {
    const adminsRepository = new AdminsRepositoryMemory();
    const sut = new LoginAdminUseCase(adminsRepository);

    return { adminsRepository, sut };
}

jest.mock("bcryptjs", () => ({
    compare: () => true,
}));

jest.mock("jsonwebtoken", () => ({
    sign: () => "token",
}));

describe("Login admin", () => {
    it("Should be able login admin", async () => {
        const { adminsRepository, sut } = makeSut();

        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };

        jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => true);

        await adminsRepository.create(admin);

        const adminToken = await sut.execute(admin);

        expect(adminToken).toHaveProperty("token");
        expect(adminToken).toHaveProperty("id");
        expect(adminToken.email).toEqual(admin.email);
    });

    it("Should call method findOne with correct params", async () => {
        const { adminsRepository, sut } = makeSut();

        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };

        const findOneSpy = jest
            .spyOn(adminsRepository, "findOne")
            .mockImplementationOnce(async () => ({ ...admin, id: "valid_id" }));

        await sut.execute(admin);

        expect(findOneSpy).toHaveBeenCalledWith({ email: admin.email });
    });

    it("Should call method bcryptjs compare with correct params", async () => {
        const { adminsRepository, sut } = makeSut();

        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };
        jest.spyOn(adminsRepository, "findOne").mockImplementationOnce(
            async () => ({
                ...admin,
                id: "valid_id",
                password: "hashed_password",
            }),
        );

        const compareSpy = jest.spyOn(bcrypt, "compare");

        await sut.execute(admin);

        expect(compareSpy).toHaveBeenCalledWith(
            admin.password,
            "hashed_password",
        );
    });

    it("Should call method jwt sign with correct params", async () => {
        const { adminsRepository, sut } = makeSut();

        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };
        jest.spyOn(adminsRepository, "findOne").mockImplementationOnce(
            async () => ({
                ...admin,
                id: "valid_id",
                password: "hashed_password",
            }),
        );

        const jwtSpy = jest.spyOn(jwt, "sign");

        await sut.execute(admin);

        expect(jwtSpy).toHaveBeenCalledWith(
            {
                emailAdmin: admin.email,
                id: "valid_id",
            },
            env.JWT_SECRET,
        );
    });

    it("Should be impossible login with email or password incorrect", async () => {
        const { adminsRepository, sut } = makeSut();

        jest.restoreAllMocks();

        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };

        jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => false);

        await adminsRepository.create(admin);

        await expect(
            async () =>
                await sut.execute({
                    email: admin.email,
                    password: "dsadsadsa",
                }),
        ).rejects.toEqual(new AppError("Password or email is not valid", 400));

        await expect(
            async () =>
                await sut.execute({
                    email: "testeemail@gmail.com",
                    password: admin.password,
                }),
        ).rejects.toEqual(new AppError("Password or email is not valid", 400));
    });
});
