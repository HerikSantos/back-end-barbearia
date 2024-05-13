import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { CreateAdminUseCase } from "../../Admins/CreateAdminUseCase/CreateAdminUseCase";
import { LoginAdminUseCase } from "../../Admins/LoginAdminUseCase/LoginAdminUseCase";
import { CreateClientUseCase } from "../../Clients/CreateClientUseCase/CreateClientUseCase";
import { LoginClientUseCase } from "../../Clients/LoginClientUseCase/LoginClientUseCase";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";

let verifyTokenUseCase: VerifyTokenUseCase;
let createClientUseCase: CreateClientUseCase;
let createAdminUseCase: CreateAdminUseCase;
let clientRepository: ClientsRepositoryMemory;
let adminRepository: AdminsRepositoryMemory;
let loginAdminUseCase: LoginAdminUseCase;
let loginClientUseCase: LoginClientUseCase;

describe("Verify token", () => {
    beforeEach(() => {
        adminRepository = new AdminsRepositoryMemory();
        createAdminUseCase = new CreateAdminUseCase(adminRepository);
        loginAdminUseCase = new LoginAdminUseCase(adminRepository);
        clientRepository = new ClientsRepositoryMemory();
        createClientUseCase = new CreateClientUseCase(clientRepository);
        loginClientUseCase = new LoginClientUseCase(clientRepository);
        verifyTokenUseCase = new VerifyTokenUseCase(
            adminRepository,
            clientRepository,
        );
    });

    it("Should be able verify admin token", async () => {
        const admin = {
            name: "teste dos santos",
            email: "teste@gmail.com",
            password: "123teste",
        };

        await createAdminUseCase.execute(admin);

        const adminToken = await loginAdminUseCase.execute(admin);

        const { token } = adminToken;

        if (!token) throw new Error("Token invalid");

        await verifyTokenUseCase.verifyTokenAdmin(token);
    });

    it("Should be able verify client token", async () => {
        const client = {
            name: "teste da silva",
            qtd_cortes: 2,
            data_nasc: new Date("2001-04-22"),
        };

        await createClientUseCase.execute(client);

        const clientToken = await loginClientUseCase.execute(client);

        const { token } = clientToken;

        if (!token) throw new Error("Token invalid");

        await verifyTokenUseCase.verifyTokenClient(token);
    });
});
