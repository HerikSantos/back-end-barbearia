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

        const findedAdmin = await readAdminUseCase.execute();

        expect(findedAdmin).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "teste dos santos",
                    email: "teste@gmail.com",
                    password: "teste",
                }),
            ]),
        );
        expect(findedAdmin[0]).toHaveProperty("id");
    });
});
