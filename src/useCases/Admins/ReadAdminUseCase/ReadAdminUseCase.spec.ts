import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { ReadAdminUseCase } from "./ReadAdminUseCase";

describe("Read admins", () => {
    it("Shoud be able list all admins", async () => {
        const adminsRepository = new AdminsRepositoryMemory();
        const readAdminUseCase = new ReadAdminUseCase(adminsRepository);

        const admin = {
            name: "teste dos santos",
            email: "teste@gmail.com",
            password: "teste",
        };

        await adminsRepository.create(admin);

        const admins = await readAdminUseCase.execute();

        expect(admins).toHaveLength(1);
    });
});
