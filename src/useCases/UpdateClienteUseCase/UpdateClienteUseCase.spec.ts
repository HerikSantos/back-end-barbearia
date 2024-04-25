import { type Clientes } from "../../database/entities/Clientes";
import { AppError } from "../../errors/AppErros";
import { ClienteRepositoryMemory } from "../../repositories/ClienteRepositoryMemory";
import { CreateClienteUseCase } from "../CreateClienteUseCase/CreateClienteUseCase";
import { ReadClientesUseCase } from "../ReadClienteUseCase/ReadClientesUseCase";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let updateClienteUseCase: UpdateClienteUseCase;
let createClienteUseCase: CreateClienteUseCase;
let readClientsUseCase: ReadClientesUseCase;

describe("Should be edit client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        updateClienteUseCase = new UpdateClienteUseCase(
            clienteRepositoryMemory,
        );
        createClienteUseCase = new CreateClienteUseCase(
            clienteRepositoryMemory,
        );
        readClientsUseCase = new ReadClientesUseCase(clienteRepositoryMemory);
    });

    it("Edit client", async () => {
        await createClienteUseCase.execute({
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        });

        const findedClient = await readClientsUseCase.execute({
            name: "cobaia",
        });

        const client: Clientes = findedClient[0];

        client.name = "Teste123";

        const clientEdited = await updateClienteUseCase.execute(client);

        expect(clientEdited.name).toBe("Teste123");
    });

    it("Should be impossible edit a client nonexisting", async () => {
        await expect(async () => {
            const client = {
                name: "cobaia",
                data_nasc: new Date("2001-04-02"),
                qtd_cortes: 5,
            };

            await createClienteUseCase.execute(client);

            client.name = "tico";

            const result = await clienteRepositoryMemory.findOne(client);

            if (!result) throw new AppError("Client not found");
        }).rejects.toBeInstanceOf(AppError);
    });
});
