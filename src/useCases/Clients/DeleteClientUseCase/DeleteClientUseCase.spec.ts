import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let deleteClientUseCase: DeleteClientUseCase;
let clientsRepositoryMemory: ClientsRepositoryMemory;

describe("Delete client", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        deleteClientUseCase = new DeleteClientUseCase(clientsRepositoryMemory);
    });

    it("Should be possible delete an exists client", async () => {
        const client = {
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        await clientsRepositoryMemory.create(client);

        const createdClient = await clientsRepositoryMemory.findOne({
            name: client.name,
            data_nasc: client.data_nasc,
        });

        if (!createdClient) throw new AppError("Client not found");

        await deleteClientUseCase.execute(createdClient.id);

        const deletedClient =
            await clientsRepositoryMemory.findOne(createdClient);

        expect(deletedClient).toBeNull();
    });

    it("Should be impossible delete a nonexistent client", async () => {
        await expect(async () => {
            const client = {
                name: "testando",
                data_nasc: new Date("2003-04-01"),
                qtd_cortes: 2,
            };

            await clientsRepositoryMemory.create(client);

            const createdClient = await clientsRepositoryMemory.findOne({
                name: "Joao",
                data_nasc: client.data_nasc,
            });

            if (!createdClient) throw new AppError("Client not found");
        }).rejects.toBeInstanceOf(AppError);
    });
});
