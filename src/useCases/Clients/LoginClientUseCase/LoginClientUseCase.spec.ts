import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { env } from "../../../utils/enviroment";
import { LoginClientUseCase } from "./LoginClientUseCase";

interface ITypeSut {
    sut: LoginClientUseCase;
    clientsRepository: IClientsRepository;
}

function makeSut(): ITypeSut {
    const clientsRepository = new ClientsRepositoryMemory();
    const sut = new LoginClientUseCase(clientsRepository);

    return {
        sut,
        clientsRepository,
    };
}

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

describe("Login client", () => {
    it("Should be able to login client", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "valid_token");

        await clientsRepository.create({
            ...client,
            data_nasc: new Date(client.data_nasc),
        });

        const result = await sut.execute(client);

        expect(result).toHaveProperty("token");
        expect(result.token).toEqual("valid_token");
        expect(result.name).toEqual(client.name);
        expect(result.id).toBeTruthy();
    });

    it("Should be not possible login with incorrect data", async () => {
        const { sut } = makeSut();
        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        await expect(async () => await sut.execute(client)).rejects.toEqual(
            new AppError("Username or birthday is incorrect"),
        );
    });

    it("Should call findOne with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        const findOneSpy = jest
            .spyOn(clientsRepository, "findOne")
            .mockResolvedValueOnce({
                ...client,
                data_nasc: new Date(client.data_nasc),
                id: "valid_id",
            });

        await sut.execute(client);

        expect(findOneSpy).toHaveBeenCalledWith({
            name: client.name,
            data_nasc: new Date(client.data_nasc),
        });
    });

    it("Should jwt return a token", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "valid_token");

        jest.spyOn(clientsRepository, "findOne").mockResolvedValueOnce({
            ...client,
            data_nasc: new Date(client.data_nasc),
            id: "valid_id",
        });

        const result = await sut.execute(client);

        expect(result.token).toEqual("valid_token");
    });

    it("Should be not possible login with incorrect data", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "valid_token");

        await clientsRepository.create({
            ...client,
            data_nasc: new Date(client.data_nasc),
        });

        await expect(
            async () => await sut.execute({ ...client, name: "capitao teste" }),
        ).rejects.toEqual(new AppError("Username or birthday is incorrect"));
    });

    it("Should call jwt with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-02-20",
        };

        const jwtSpy = jest.spyOn(jwt, "sign");

        jest.spyOn(clientsRepository, "findOne").mockResolvedValueOnce({
            ...client,
            data_nasc: new Date(client.data_nasc),
            id: "valid_id",
        });

        await sut.execute(client);

        expect(jwtSpy).toHaveBeenCalledWith(
            {
                id: "valid_id",
                name: "teste da silva",
                data_nasc: new Date("2001-02-20"),
            },
            env.JWT_SECRET,
            { expiresIn: "7D" },
        );
    });

    it("Should throw if data_nasc is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            name: "teste da silva",
            data_nasc: "",
        };

        await expect(async () => {
            await sut.execute(client);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("Should throw if name is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            name: "",
            data_nasc: "2000-04-22",
        };

        await expect(async () => {
            await sut.execute(client);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("should throw an error if data_nasc is not a string", async () => {
        const { sut } = makeSut();

        await expect(
            sut.execute({
                name: "herik",
                data_nasc: new Date("2001-02-22") as unknown as string,
            }),
        ).rejects.toEqual(new AppError("Invalid type or missing data", 400));
    });

    it("should throw an error if name is not a string", async () => {
        const { sut } = makeSut();

        await expect(
            sut.execute({
                name: 2 as unknown as string,
                data_nasc: "2001-02-22",
            }),
        ).rejects.toEqual(new AppError("Invalid type or missing data", 400));
    });
});
