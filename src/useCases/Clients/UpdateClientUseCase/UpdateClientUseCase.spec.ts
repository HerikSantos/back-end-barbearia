import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

let clientsRepositoryMemory: ClientsRepositoryMemory;
let updateClientUseCase: UpdateClientUseCase;

describe("Should be edit client", () => {
    beforeEach(() => {
        clientsRepositoryMemory = new ClientsRepositoryMemory();
        updateClientUseCase = new UpdateClientUseCase(clientsRepositoryMemory);
    });

    it("Edit client", async () => {
        const client = {
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        };

        await clientsRepositoryMemory.create(client);

        const findedClient = await clientsRepositoryMemory.findOne(client);

        if (!findedClient) throw new AppError("Client not found");

        findedClient.name = "Teste123";

        const editedClient = await updateClientUseCase.execute(findedClient);

        expect(editedClient.name).toBe("Teste123");
    });

    it("Should be impossible edit a client nonexisting", async () => {
        await expect(async () => {
            const client = {
                id: uuidv4(),
                name: "cobaia",
                data_nasc: new Date("2001-04-02"),
                qtd_cortes: 5,
            };

            await updateClientUseCase.execute(client);
        }).rejects.toBeInstanceOf(AppError);
    });
});
