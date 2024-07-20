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
            data_nasc: new Date("2001-02-20"),
        };

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "valid_token");

        await clientsRepository.create(client);

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
            data_nasc: new Date("2001-02-20"),
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
            data_nasc: new Date("2001-02-20"),
        };

        const findOneSpy = jest
            .spyOn(clientsRepository, "findOne")
            .mockResolvedValueOnce({ ...client, id: "valid_id" });

        await sut.execute(client);

        expect(findOneSpy).toHaveBeenCalledWith({
            name: client.name,
            data_nasc: client.data_nasc,
        });
    });

    it("Should jwt return a token", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: new Date("2001-02-20"),
        };

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => "valid_token");

        jest.spyOn(clientsRepository, "findOne").mockResolvedValueOnce({
            ...client,
            id: "valid_id",
        });

        const result = await sut.execute(client);

        expect(result.token).toEqual("valid_token");
    });

    it("Should call jwt with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: new Date("2001-02-20"),
        };

        const jwtSpy = jest.spyOn(jwt, "sign");

        jest.spyOn(clientsRepository, "findOne").mockResolvedValueOnce({
            ...client,
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
});
