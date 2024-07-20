import validator from "validator";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { cryptPassword } from "../../../utils/cryptPassword";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

interface ISutTypes {
    sut: CreateAdminUseCase;
    adminsRepository: AdminsRepositoryMemory;
}

function makeSut(): ISutTypes {
    const adminsRepository = new AdminsRepositoryMemory();
    const sut = new CreateAdminUseCase(adminsRepository);

    return {
        adminsRepository,
        sut,
    };
}

jest.mock("validator", () => ({
    isEmail: () => true,
}));

jest.mock("../../../utils/cryptPassword", () => ({
    cryptPassword: jest.fn(),
}));

describe("Create a new admin", () => {
    it("Should be alble create a admin", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };
        await sut.execute(admin);

        const createdAdmin = await adminsRepository.findOne(admin);

        expect(createdAdmin).toHaveProperty("id");
    });

    it("Should call adminsRepository.findOne with correct params", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };

        const adminsRepositorySpy = jest.spyOn(adminsRepository, "findOne");

        await sut.execute(admin);

        expect(adminsRepositorySpy).toHaveBeenCalledWith({
            email: admin.email,
        });
    });

    it("Should call adminsRepository.create with correct params", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };

        (cryptPassword as jest.Mock).mockImplementationOnce(
            () => "hashed_password",
        );

        const adminsRepositorySpy = jest.spyOn(adminsRepository, "create");

        await sut.execute(admin);

        expect(adminsRepositorySpy).toHaveBeenCalledWith({
            ...admin,
            password: "hashed_password",
        });
    });

    it("Should call cryptPassword with correct params", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };

        const cryptPasswordMock = cryptPassword as jest.Mock;

        await sut.execute(admin);

        expect(cryptPasswordMock).toHaveBeenCalledWith(admin.password);
    });

    it("Should be impossible create a admin with invalid email", async () => {
        const { sut } = makeSut();

        jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

        const admin = {
            name: "teste da silva",
            email: "testando.com",
            password: "teste",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Email is not valid", 400));
    });

    it("Should be impossible create a admin with email already exists", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "teste@gmail.com",
            password: "teste",
        };

        await sut.execute(admin);

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Email is not valid", 400));
    });

    it("Should throw if name is not string", async () => {
        const { sut } = makeSut();

        const admin = {
            name: 2,
            email: "teste@gmail.com",
            password: "teste",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Invalid type data", 400));
    });

    it("Should throw if email is not string", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste dos santos",
            email: ["herik@gmail.com"],
            password: "teste",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Invalid type data", 400));
    });

    it("Should throw if password is not string", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste dos santos",
            email: "teste@gmail.com",
            password: 123,
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Invalid type data", 400));
    });

    it("Should throw if name is undefined", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "",
            email: "teste@gmail.com",
            password: "123",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("Should throw if email is undefined", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "",
            password: "123",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("Should throw if password is not string", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "teste@gmail.com",
            password: "",
        };

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });
});
