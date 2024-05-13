import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { CreateClientUseCase } from "./CreateClientUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let createClientUseCase: CreateClientUseCase;

describe("Create client", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        createClientUseCase = new CreateClientUseCase(clientsRepositoryMemory);
    });

    it("Should be possible create a new client", async () => {
        const cliente = {
            name: "cliente teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        await createClientUseCase.execute(cliente);

        const clientExist = await clientsRepositoryMemory.findOne({
            name: cliente.name,
            data_nasc: cliente.data_nasc,
        });

        expect(clientExist).toHaveProperty("id");
    });

    it("not should be possible create a new client who exsit", async () => {
        await expect(async () => {
            const cliente = {
                name: "cliente teste",
                qtd_cortes: 5,
                data_nasc: new Date("2001-04-26"),
            };

            await createClientUseCase.execute(cliente);

            await createClientUseCase.execute(cliente);
        }).rejects.toBeInstanceOf(AppError);
    });
});
