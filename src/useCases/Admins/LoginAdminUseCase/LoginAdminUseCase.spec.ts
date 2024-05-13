import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { CreateAdminUseCase } from "../CreateAdminUseCase/CreateAdminUseCase";
import { LoginAdminUseCase } from "./LoginAdminUseCase";

let adminsRepository: AdminsRepositoryMemory;
let loginAdminUseCase: LoginAdminUseCase;
let createAdminUseCase: CreateAdminUseCase;

describe("Login admin", () => {
    beforeEach(() => {
        adminsRepository = new AdminsRepositoryMemory();
        loginAdminUseCase = new LoginAdminUseCase(adminsRepository);
        createAdminUseCase = new CreateAdminUseCase(adminsRepository);
    });

    it("Should be able login admin", async () => {
        const admin = {
            email: "teste@gmail.com",
            name: "teste Almeida",
            password: "teste123",
        };

        await createAdminUseCase.execute(admin);

        const adminToken = await loginAdminUseCase.execute(admin);

        expect(adminToken).toHaveProperty("token");
    });

    it("Should be impossible login with email or password incorrect", async () => {
        await expect(async () => {
            const admin = {
                email: "teste@gmail.com",
                name: "teste Almeida",
                password: "teste123",
            };

            await createAdminUseCase.execute(admin);

            await loginAdminUseCase.execute({
                email: admin.email,
                password: "dsadsadsa",
            });
        }).rejects.toBeInstanceOf(AppError);

        await expect(async () => {
            const admin = {
                email: "teste@gmail.com",
                name: "teste Almeida",
                password: "teste123",
            };

            await createAdminUseCase.execute(admin);

            await loginAdminUseCase.execute({
                email: "testeemail@gmail.com",
                password: admin.password,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
