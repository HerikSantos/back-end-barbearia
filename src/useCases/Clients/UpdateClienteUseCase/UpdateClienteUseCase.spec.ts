import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let updateClienteUseCase: UpdateClienteUseCase;

describe("Should be edit client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        updateClienteUseCase = new UpdateClienteUseCase(
            clienteRepositoryMemory,
        );
    });

    it("Edit client", async () => {
        const client = {
            name: "cobaia",
            data_nasc: new Date("2001-04-02"),
            qtd_cortes: 5,
        };

        await clienteRepositoryMemory.create(client);

        const findedClient = await clienteRepositoryMemory.findOne(client);

        if (!findedClient) throw new AppError("Client not found");

        findedClient.name = "Teste123";

        const editedClient = await updateClienteUseCase.execute(findedClient);

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

            await updateClienteUseCase.execute(client);
        }).rejects.toBeInstanceOf(AppError);
    });
});
