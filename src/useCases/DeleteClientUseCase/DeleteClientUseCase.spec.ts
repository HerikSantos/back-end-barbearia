import { type Clientes } from "../../database/entities/Clientes";
import { AppError } from "../../errors/AppErros";
import { ClienteRepositoryMemory } from "../../repositories/ClienteRepositoryMemory";
import { CreateClienteUseCase } from "../CreateClienteUseCase/CreateClienteUseCase";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let deleteClientUseCase: DeleteClientUseCase;
let clienteRepositoryMemory: ClienteRepositoryMemory;
let createClientUseCase: CreateClienteUseCase;

describe("Delete client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        deleteClientUseCase = new DeleteClientUseCase(clienteRepositoryMemory);
        createClientUseCase = new CreateClienteUseCase(clienteRepositoryMemory);
    });

    it("Should be possible delete an exists client", async () => {
        const client = {
            name: "testando",
            data_nasc: new Date("2003-04-01"),
            qtd_cortes: 2,
        };

        await createClientUseCase.execute(client);

        const createdClient = await clienteRepositoryMemory.findOne({
            name: client.name,
            data_nasc: client.data_nasc,
        });

        if (!createdClient) throw new AppError("Client not found");

        const newClient: Clientes = createdClient[0] ?? createdClient;

        await deleteClientUseCase.execute(newClient.id);

        const deletedClient = await clienteRepositoryMemory.findOne({
            name: newClient.name,
            data_nasc: newClient.data_nasc,
        });

        expect(deletedClient).toBeUndefined();
    });

    it("Should be impossible delete a nonexistent client", async () => {
        await expect(async () => {
            const client = {
                name: "testando",
                data_nasc: new Date("2003-04-01"),
                qtd_cortes: 2,
            };

            await createClientUseCase.execute(client);

            const createdClient = await clienteRepositoryMemory.findOne({
                name: "Joao",
                data_nasc: client.data_nasc,
            });

            if (!createdClient) throw new AppError("Client not found");
        }).rejects.toBeInstanceOf(AppError);
    });
});
