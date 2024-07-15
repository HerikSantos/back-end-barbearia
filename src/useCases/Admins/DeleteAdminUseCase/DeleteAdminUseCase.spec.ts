import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { DeleteAdminUseCase } from "./DeleteAdminUseCase";

interface ISutTypes {
    adminsRepository: IAdminsRepository;
    sut: DeleteAdminUseCase;
}
function makeSut(): ISutTypes {
    const adminsRepository = new AdminsRepositoryMemory();
    const sut = new DeleteAdminUseCase(adminsRepository);

    return {
        adminsRepository,
        sut,
    };
}

describe("Delete admin", () => {
    it("Should be able delete a admin", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste",
            email: "teste@gmail.com",
            password: "123teste",
        };

        await adminsRepository.create(admin);

        const result = await adminsRepository.findOne(admin);

        if (!result) throw new AppError("Error Test delete");

        await sut.execute({ id: result.id });

        const existedAdmin = await adminsRepository.findByID(result.id);

        expect(existedAdmin).toBeNull();
    });

    it("Should return a throw if admin do not exists", async () => {
        await expect(async () => {
            const { sut } = makeSut();

            const admin = {
                id: uuidv4(),
                name: "teste",
                email: "teste@gmail.com",
                password: "123teste",
            };

            await sut.execute({ id: admin.id });
        }).rejects.toMatchObject({
            message: "Admin not found",
            statusCode: 400,
        });
    });

    it("Ensure call findByID with correct param", async () => {
        const { sut, adminsRepository } = makeSut();
        // eslint-disable-next-line

        const admin = {
            id: "valid_id",
            name: "valid_name",
            email: "valid_email",
            password: "valid_password",
        };

        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(admin);

        const repositorySpy = jest.spyOn(adminsRepository, "delete");

        await sut.execute({ id: "valid_id" });

        expect(repositorySpy).toHaveBeenCalledWith("valid_id");
    });

    it("Should throws if throw", async () => {
        const { sut } = makeSut();

        jest.spyOn(sut, "execute").mockImplementationOnce(() => {
            throw new Error();
        });

        await expect(async () => {
            await sut.execute({ id: "valid_id" });
        }).rejects.toThrow();
    });
});
