import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { DeleteAdminUseCase } from "./DeleteAdminUseCase";

interface ISutTypes {
    sut: DeleteAdminUseCase;
    adminsRepository: AdminsRepositoryMemory;
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

    it("Should be impossible delete a inexistent admin", async () => {
        const { sut, adminsRepository } = makeSut();

        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(null);

        const admin = {
            id: "invalid_id",
            name: "teste",
            email: "teste@gmail.com",
            password: "123teste",
        };

        await expect(async () => {
            await sut.execute({ id: admin.id });
        }).rejects.toEqual(new AppError("Admin not found", 400));
    });

    it("Should call adminsRepository.findByID with correct params", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: "invalid_id",
            name: "teste",
            email: "teste@gmail.com",
            password: "123teste",
        };

        const findByIdSpy = jest.spyOn(adminsRepository, "findByID");

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toEqual(new AppError("Admin not found", 400));
        expect(findByIdSpy).toHaveBeenCalledWith(admin.id);
    });

    it("Should call adminsRepository.delete with correct params", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            id: "invalid_id",
            name: "teste",
            email: "teste@gmail.com",
            password: "123teste",
        };

        jest.spyOn(adminsRepository, "findByID").mockResolvedValueOnce(admin);
        const deleteSpy = jest.spyOn(adminsRepository, "delete");

        await sut.execute(admin);

        expect(deleteSpy).toHaveBeenCalledWith(admin.id);
    });
});
