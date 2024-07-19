import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { CreateClientUseCase } from "./CreateClientUseCase";

interface ITypes {
    sut: CreateClientUseCase;
    clientsRepository: IClientsRepository;
}

function makeSut(): ITypes {
    const clientsRepository = new ClientsRepositoryMemory();
    const sut = new CreateClientUseCase(clientsRepository);

    return { sut, clientsRepository };
}

describe("Create client", () => {
    it("Should be possible create a new client", async () => {
        const { sut, clientsRepository } = makeSut();

        const cliente = {
            name: "cliente teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        await sut.execute(cliente);

        const clientExist = await clientsRepository.findOne({
            name: cliente.name,
            data_nasc: cliente.data_nasc,
        });

        expect(clientExist).toHaveProperty("id");
    });

    it("Not should be possible create a new client who exists", async () => {
        const { sut } = makeSut();

        const cliente = {
            name: "cliente teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        await sut.execute(cliente);

        await expect(async () => {
            await sut.execute(cliente);
        }).rejects.toEqual(new AppError("Client already exists", 400));
    });

    it("Should call findOne with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        const findOneSpy = jest.spyOn(clientsRepository, "findOne");

        await sut.execute(client);

        expect(findOneSpy).toHaveBeenCalledWith({
            name: client.name,
            data_nasc: client.data_nasc,
        });
    });

    it("Should call create with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        const createSpy = jest.spyOn(clientsRepository, "create");

        await sut.execute(client);

        expect(createSpy).toHaveBeenCalledWith(client);
    });

    it("Should throw if name is missing", async () => {
        const { sut } = makeSut();

        const client = {
            name: "",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        await expect(async () => {
            await sut.execute(client);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });
});
