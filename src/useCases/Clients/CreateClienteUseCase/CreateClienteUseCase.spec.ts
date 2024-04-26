import { AppError } from "../../../errors/AppErros";
import { ClienteRepositoryMemory } from "../../../repositories/ClienteRepositoryMemory";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

let clienteRepositoryMemory: ClienteRepositoryMemory;
let createClienteUseCase: CreateClienteUseCase;

describe("Create client", () => {
    beforeEach(() => {
        clienteRepositoryMemory = new ClienteRepositoryMemory();
        createClienteUseCase = new CreateClienteUseCase(
            clienteRepositoryMemory,
        );
    });

    it("Should be possible create a new client", async () => {
        const cliente = {
            name: "cliente teste",
            qtd_cortes: 5,
            data_nasc: new Date("2001-04-26"),
        };

        await createClienteUseCase.execute(cliente);

        const clientExist = await clienteRepositoryMemory.findOne({
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

            await createClienteUseCase.execute(cliente);

            await createClienteUseCase.execute(cliente);
        }).rejects.toBeInstanceOf(AppError);
    });
});
