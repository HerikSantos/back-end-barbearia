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

    it("not should be possible create a new client who exsit", async () => {
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
});
