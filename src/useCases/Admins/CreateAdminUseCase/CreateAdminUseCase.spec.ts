import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

let createAdminUseCase: CreateAdminUseCase;
let adminsRepository: AdminsRepositoryMemory;

describe("Create a new admin", () => {
    beforeEach(() => {
        adminsRepository = new AdminsRepositoryMemory();
        createAdminUseCase = new CreateAdminUseCase(adminsRepository);
    });

    it("Should be alble create a admin", async () => {
        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };
        await createAdminUseCase.execute(admin);

        const createdAdmin = await adminsRepository.findOne(admin);

        expect(createdAdmin).toHaveProperty("id");
    });

    it("Should be impossible create a admin with email invalid", async () => {
        await expect(async () => {
            const admin = {
                name: "teste da silva",
                email: "testando.com",
                password: "teste",
            };

            await createAdminUseCase.execute(admin);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be impossible create a admin with email already exists", async () => {
        await expect(async () => {
            const admin = {
                name: "teste da silva",
                email: "teste@gmail.com",
                password: "teste",
            };

            await createAdminUseCase.execute(admin);

            await createAdminUseCase.execute(admin);
        }).rejects.toBeInstanceOf(AppError);
    });
});
