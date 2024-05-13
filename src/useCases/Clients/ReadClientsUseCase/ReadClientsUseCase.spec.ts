import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { ReadClientsUseCase } from "./ReadClientsUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let readClientsUseCase: ReadClientsUseCase;

describe("Should be list all clients", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        readClientsUseCase = new ReadClientsUseCase(clientsRepositoryMemory);
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

        await clientsRepositoryMemory.create(client);

        await clientsRepositoryMemory.create(client2);

        const findedClient = await readClientsUseCase.execute({
            name: client.name,
        });

        expect(findedClient).toHaveLength(2);
    });
});
