import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

interface ITypeSut {
    sut: UpdateClientUseCase;
    clientsRepository: IClientsRepository;
}

function makeSut(): ITypeSut {
    const clientsRepository = new ClientsRepositoryMemory();
    const sut = new UpdateClientUseCase(clientsRepository);

    return {
        sut,
        clientsRepository,
    };
}

describe("Should be edit client", () => {
    it("Edit client", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        };

        await clientsRepository.create(client);

        const findedClient = await clientsRepository.findOne(client);

        if (!findedClient) throw new AppError("Client not found");

        findedClient.name = "Teste123";

        const editedClient = await sut.execute(findedClient);

        expect(editedClient.name).toBe("Teste123");
    });

    it("Should be impossible edit a client nonexisting", async () => {
        const { sut } = makeSut();

        const client = {
            id: uuidv4(),
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        };

        await expect(async () => {
            await sut.execute(client);
        }).rejects.toEqual(new AppError("Client not found", 400));
    });

    it("Should throws if id is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            id: "",
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        };

        await expect(async () => {
            await sut.execute(client);
        }).rejects.toEqual(new AppError("Id is required", 400));
    });
});
