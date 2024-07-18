import { v4 as uuidv4 } from "uuid";
import validator from "validator";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { cryptPassword } from "../../../utils/cryptPassword";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

jest.mock("validator", () => ({
    isEmail: () => true,
}));

jest.mock("../../../utils/cryptPassword", () => ({
    cryptPassword: jest.fn(),
}));

interface ITypes {
    sut: UpdateAdminUseCase;
    adminsRepository: IAdminsRepository;
}

function makeSut(): ITypes {
    const adminsRepository = new AdminsRepositoryMemory();
    const sut = new UpdateAdminUseCase(adminsRepository);

    return { sut, adminsRepository };
}

describe("Update admin", () => {
    it("Should be able update admin", async () => {
        const { sut, adminsRepository } = makeSut();

        const admins = {
            name: "teste de santos",
            email: "teste@gmail.com",
            password: "teste123",
        };

        await adminsRepository.create(admins);

        const createdAdmin = await adminsRepository.findOne({
            email: admins.email,
        });

        if (!createdAdmin) throw new AppError("Teste update");

        createdAdmin.email = "edited@gmail.com";

        const result = await sut.execute(createdAdmin);

        expect(result.email).toBe("edited@gmail.com");
    });

    it("Should throw if invalid email", async () => {
        const { sut } = makeSut();

        jest.spyOn(validator, "isEmail").mockImplementationOnce(() => false);

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "testegmail",
            password: "12tesete3",
        };

        await expect(async () => await sut.execute(admin)).rejects.toEqual(
            new AppError("Email is not valid", 400),
        );
    });

    it("Should throw if id is not valid", async () => {
        const { sut } = makeSut();

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com",
            password: "12tesete3",
        };

        await expect(async () => await sut.execute(admin)).rejects.toEqual(
            new AppError("ID is not valid", 400),
        );
    });

    it("Should be call cryptPassword with correct param", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com",
            password: "12tesete3",
        };

        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(admin);
        jest.spyOn(adminsRepository, "edit").mockResolvedValueOnce(admin);

        const cryptPasswordMock = cryptPassword as jest.Mock;

        await sut.execute(admin);

        expect(cryptPasswordMock).toHaveBeenCalledWith(admin.password);
    });

    it("Should be call isEmail with correct param", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com",
            password: "12tesete3",
        };
        const isEmailSpy = jest.spyOn(validator, "isEmail");
        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(admin);
        jest.spyOn(adminsRepository, "edit").mockResolvedValueOnce(admin);

        await sut.execute(admin);

        expect(isEmailSpy).toHaveBeenCalledWith(admin.email);
    });

    it("Should be call findByID with correct param", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com",
            password: "12tesete3",
        };

        const findByIdSpy = jest
            .spyOn(adminsRepository, "findByID")
            .mockResolvedValueOnce(admin);
        jest.spyOn(adminsRepository, "edit").mockResolvedValueOnce(admin);

        await sut.execute(admin);

        expect(findByIdSpy).toHaveBeenCalledWith(admin.id);
    });

    it("Should be call edit with correct param", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com",
            password: "12tesete3",
        };

        (cryptPassword as jest.Mock).mockImplementation(
            () => "hashed_password",
        );

        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(admin);
        const editSpy = jest
            .spyOn(adminsRepository, "edit")
            .mockResolvedValueOnce(admin);

        await sut.execute(admin);

        expect(editSpy).toHaveBeenCalledWith({
            ...admin,
            password: "hashed_password",
        });
    });
});
