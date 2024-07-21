import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { isValidDate } from "../../../utils/dateValidator";
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

jest.mock("../../../utils/dateValidator", () => ({
    isValidDate: jest.fn(),
}));

describe("Create client", () => {
    it("Should be possible create a new client", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: "2001-04-26",
        };

        (isValidDate as jest.Mock).mockImplementationOnce(() => true);

        await sut.execute(client.name, client.data_nasc, client.qtd_cortes);

        const clientExist = await clientsRepository.findOne({
            name: client.name,
            data_nasc: new Date(client.data_nasc),
        });

        expect(clientExist).toHaveProperty("id");
    });

    it("Not should be possible create a new client who exists", async () => {
        const { sut } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: "2001-04-26",
        };

        (isValidDate as jest.Mock).mockImplementationOnce(() => true);

        await sut.execute(client.name, client.data_nasc, client.qtd_cortes);

        await expect(async () => {
            (isValidDate as jest.Mock).mockImplementationOnce(() => true);
            await sut.execute(client.name, client.data_nasc, client.qtd_cortes);
        }).rejects.toEqual(new AppError("Client already exists", 400));
    });

    it("Should call findOne with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: "2001-04-26",
        };
        (isValidDate as jest.Mock).mockImplementationOnce(() => true);

        const findOneSpy = jest.spyOn(clientsRepository, "findOne");

        await sut.execute(client.name, client.data_nasc, client.qtd_cortes);

        expect(findOneSpy).toHaveBeenCalledWith({
            name: client.name,
            data_nasc: new Date(client.data_nasc),
        });
    });

    it("Should call create with correct params", async () => {
        const { sut, clientsRepository } = makeSut();

        const client = {
            name: "client teste",
            qtd_cortes: 5,
            data_nasc: "2001-04-26",
        };

        (isValidDate as jest.Mock).mockImplementationOnce(() => true);

        const createSpy = jest.spyOn(clientsRepository, "create");

        await sut.execute(client.name, client.data_nasc, client.qtd_cortes);

        expect(createSpy).toHaveBeenCalledWith({
            ...client,
            data_nasc: new Date(client.data_nasc),
        });
    });

    it("Should throw if name is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            name: "",
            qtd_cortes: 5,
            data_nasc: "2001-04-26",
        };

        await expect(async () => {
            await sut.execute(client.name, client.data_nasc, client.qtd_cortes);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("Should throw if qtd_cortes is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            name: "teste da silva",
            data_nasc: "2001-04-26",
        };

        await expect(async () => {
            await sut.execute(client.name, client.data_nasc, client);
        }).rejects.toEqual(new AppError("Invalid type or missing data", 400));
    });

    it("Should throw if data_nasc is undefined", async () => {
        const { sut } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "",
        };

        await expect(async () => {
            await sut.execute(client.name, client.data_nasc, client.qtd_cortes);
        }).rejects.toEqual(new AppError("Missing data", 400));
    });

    it("Should call isValidateDate with correct params", async () => {
        const { sut } = makeSut();

        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: "2001-04-22",
        };

        const isValidateDateSpy = (
            isValidDate as jest.Mock
        ).mockImplementationOnce(() => true);

        await sut.execute(client.name, client.data_nasc, client.qtd_cortes);

        expect(isValidateDateSpy).toHaveBeenCalledWith(client.data_nasc);
    });
});
