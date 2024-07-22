import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { ReadClientsUseCase } from "./ReadClientsUseCase";

interface ITypeSut {
    sut: ReadClientsUseCase;
    clientsRepository: IClientsRepository;
}

function makeSut(): ITypeSut {
    const clientsRepository = new ClientsRepositoryMemory();
    const sut = new ReadClientsUseCase(clientsRepository);

    return {
        sut,
        clientsRepository,
    };
}

jest.mock("uuid", () => ({
    v4: jest.fn().mockReturnValue("fake_id"),
}));

describe("Should be list all clients", () => {
    it("List all client", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "herik",
            qtd_cortes: 2,
            data_nasc: new Date("2001-04-21"),
        };
        const client2 = {
            name: "herik2",
            qtd_cortes: 2,
            data_nasc: new Date("2001-04-26"),
        };

        await clientsRepository.create(client);

        await clientsRepository.create(client2);

        const findedClient = await sut.execute({
            name: client.name,
        });

        expect(findedClient[0]).toEqual({ ...client, id: "fake_id" });
        expect(findedClient[1]).toEqual({ ...client2, id: "fake_id" });
    });

    it("Should return an empty array when there are no clients", async () => {
        const { sut } = makeSut();

        const findedClient = await sut.execute({});

        expect(findedClient).toEqual([]);
    });
});
