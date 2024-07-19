import { type Clientes } from "../../../database/entities/Clientes";
import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

interface ITypeSut {
    sut: DeleteClientUseCase;
    clientsRepository: IClientsRepository;
}

function makeSut(): ITypeSut {
    const clientsRepository = new ClientsRepositoryMemory();
    const sut = new DeleteClientUseCase(clientsRepository);

    return {
        sut,
        clientsRepository,
    };
}

describe("Delete client", () => {
    it("Should be possible delete an exists client", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        await clientsRepository.create(client);
        // eslint-disable-next-line
        const createdClient = (await clientsRepository.findOne({
            name: client.name,
            data_nasc: client.data_nasc,
        })) as Clientes;

        await sut.execute(createdClient.id);

        const deletedClient = await clientsRepository.findOne(createdClient);

        expect(deletedClient).toBeNull();
    });

    it("Should be impossible delete a nonexistent client", async () => {
        const { sut } = makeSut();

        const fakeClient = {
            id: "invalid_id",
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        await expect(async () => {
            await sut.execute(fakeClient.id);
        }).rejects.toEqual(new AppError("Client not found", 400));
    });

    it("Should call findByID with correct param", async () => {
        const { sut, clientsRepository } = makeSut();

        const fakeClient = {
            id: "invalid_id",
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        const findByIdSpy = jest
            .spyOn(clientsRepository, "findByID")
            .mockResolvedValueOnce(fakeClient);

        await sut.execute(fakeClient.id);

        expect(findByIdSpy).toHaveBeenCalledWith(fakeClient.id);
    });

    it("Should call delete with correct param", async () => {
        const { sut, clientsRepository } = makeSut();

        const fakeClient = {
            id: "invalid_id",
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };
        jest.spyOn(clientsRepository, "findByID").mockResolvedValueOnce(
            fakeClient,
        );

        const deleteSpy = jest.spyOn(clientsRepository, "delete");

        await sut.execute(fakeClient.id);

        expect(deleteSpy).toHaveBeenCalledWith(fakeClient.id);
    });
});
