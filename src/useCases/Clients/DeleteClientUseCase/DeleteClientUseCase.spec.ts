import { AppError } from "../../../errors/AppErros";
import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let deleteClientUseCase: DeleteClientUseCase;
let clienteRepositoryMemory: ClienteRepositoryMemory;

describe("Delete client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        deleteClientUseCase = new DeleteClientUseCase(clienteRepositoryMemory);
    });

    it("Should be possible delete an exists client", async () => {
        const client = {
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        await clienteRepositoryMemory.create(client);

        const createdClient = await clienteRepositoryMemory.findOne({
            name: client.name,
            data_nasc: client.data_nasc,
        });

        if (!createdClient) throw new AppError("Client not found");

        await deleteClientUseCase.execute(createdClient.id);

        const deletedClient =
            await clienteRepositoryMemory.findOne(createdClient);

        expect(deletedClient).toBeNull();
    });

    it("Should be impossible delete a nonexistent client", async () => {
        await expect(async () => {
            const client = {
                name: "testando",
                data_nasc: new Date("2003-04-01"),
                qtd_cortes: 2,
            };

            await clienteRepositoryMemory.create(client);

            const createdClient = await clienteRepositoryMemory.findOne({
                name: "Joao",
                data_nasc: client.data_nasc,
            });

            if (!createdClient) throw new AppError("Client not found");
        }).rejects.toBeInstanceOf(AppError);
    });
});
