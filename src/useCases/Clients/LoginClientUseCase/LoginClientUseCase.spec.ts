import { AppError } from "../../../errors/AppErros";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { LoginClientUseCase } from "./LoginClientUseCase";

let clientRepositoryMemory: ClientsRepositoryMemory;
let loginClientUseCase: LoginClientUseCase;

describe("Login client", () => {
    beforeEach(() => {
        clientRepositoryMemory = new ClientsRepositoryMemory();
        loginClientUseCase = new LoginClientUseCase(clientRepositoryMemory);
    });

    it("Should be able to login client", async () => {
        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: new Date("2001-02-20"),
        };

        await clientRepositoryMemory.create(client);

        const result = await loginClientUseCase.execute(client);

        expect(result).toHaveProperty("token");
    });

    it("Should be not possible make login with client not exists", async () => {
        await expect(async () => {
            const client = {
                name: "teste da silva",
                qtd_cortes: 2,
                data_nasc: new Date("2001-02-20"),
            };

            await loginClientUseCase.execute(client);
        }).rejects.toBeInstanceOf(AppError);
    });
});
