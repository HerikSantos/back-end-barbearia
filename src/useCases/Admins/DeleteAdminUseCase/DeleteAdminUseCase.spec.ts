import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { DeleteAdminUseCase } from "./DeleteAdminUseCase";

describe("Delete admin", () => {
    it("Should be able delete a admin", async () => {
        const adminsRepository = new AdminsRepositoryMemory();
        const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository);

        const admin = {
            name: "teste",
            email: "teste@gmail.com",
            password: "123teste",
        };

        await adminsRepository.create(admin);

        const result = await adminsRepository.findOne(admin);

        if (!result) throw new AppError("Error Test delete");

        await deleteAdminUseCase.execute({ id: result.id });

        const existedAdmin = await adminsRepository.findByID(result.id);

        expect(existedAdmin).toBeNull();
    });

    it("Should be impossible delete a inexistent admin", async () => {
        await expect(async () => {
            const adminsRepository = new AdminsRepositoryMemory();
            const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository);

            const admin = {
                id: uuidv4(),
                name: "teste",
                email: "teste@gmail.com",
                password: "123teste",
            };

            await deleteAdminUseCase.execute({ id: admin.id });
        }).rejects.toBeInstanceOf(AppError);
    });
});
