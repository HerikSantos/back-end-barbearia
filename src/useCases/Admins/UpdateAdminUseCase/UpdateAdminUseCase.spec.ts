import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

describe("Update admin", () => {
    const adminsRepository = new AdminsRepositoryMemory();
    const updateAdminsUseCase = new UpdateAdminUseCase(adminsRepository);

    it("Should be able update admin", async () => {
        const admins = {
            name: "teste de santos",
            email: "teste@gmail.com",
            password: "teste123",
        };

        await adminsRepository.create(admins);

        const createdAdmin = await adminsRepository.findOne({
            email: admins.email,
        });

        if (!createdAdmin) throw new AppError("Teste update");

        createdAdmin.email = "edited@gmail.com";

        const result = await updateAdminsUseCase.execute(createdAdmin);

        expect(result.email).toBe("edited@gmail.com");
    });

    it("Should be impossible update admin with invalid email", async () => {
        await expect(async () => {
            const admin = {
                id: uuidv4(),
                name: "teste",
                email: "testegmail",
                password: "12tesete3",
            };

            await updateAdminsUseCase.execute(admin);
        }).rejects.toBeInstanceOf(AppError);
    });
});
