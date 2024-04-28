import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { ReadClientesUseCase } from "./ReadClientesUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let readClienteUseCase: ReadClientesUseCase;

describe("Should be list all clients", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        readClienteUseCase = new ReadClientesUseCase(clienteRepositoryMemory);
    });
    it("List all client", async () => {
        const client = {
            name: "herik",
            qtd_cortes: 2,
            data_nasc: new Date("2001-04-21"),
        };
        const client2 = {
            name: "herik2",
            qtd_cortes: 2,
            data_nasc: new Date("2001-04-21"),
        };

        await clienteRepositoryMemory.create(client);

        await clienteRepositoryMemory.create(client2);

        const findedClient = await readClienteUseCase.execute({
            name: client.name,
        });

        expect(findedClient).toHaveLength(2);
    });
});
