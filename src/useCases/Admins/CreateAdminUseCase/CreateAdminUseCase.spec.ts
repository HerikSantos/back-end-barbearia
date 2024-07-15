import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { cryptPassword } from "../../../utils/cryptPassword";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

interface ISutTypes {
    adminsRepository: IAdminsRepository;
    sut: CreateAdminUseCase;
}
function makeSut(): ISutTypes {
    const adminsRepository = new AdminsRepositoryMemory();
    const sut = new CreateAdminUseCase(adminsRepository);

    return {
        adminsRepository,
        sut,
    };
}

jest.mock("../../../utils/cryptPassword", () => ({
    cryptPassword: jest.fn(),
}));

describe("Create a new admin", () => {
    it("Should be alble create a admin", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };
        await sut.execute(admin);

        const createdAdmin = await adminsRepository.findOne(admin);

        expect(createdAdmin).toHaveProperty("id");
    });

    it("Should be call create with correct params", async () => {
        const { sut, adminsRepository } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };

        (cryptPassword as jest.Mock).mockResolvedValue("hashed_password");

        const creteAdminUseCaseSpy = jest.spyOn(adminsRepository, "create");

        await sut.execute(admin);

        expect(creteAdminUseCaseSpy).toHaveBeenCalledWith({
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "hashed_password",
        });
    });

    it("Should be call cryptPassword with correct params", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "testando@gmail.com",
            password: "teste",
        };

        await sut.execute(admin);

        expect(cryptPassword).toHaveBeenCalledWith(admin.password);
    });

    it("Should be impossible create a admin with email invalid", async () => {
        const { sut } = makeSut();
        const admin = {
            name: "teste da silva",
            email: "testando.com",
            password: "teste",
        };
        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toMatchObject({
            message: "Email is not valid",
            statusCode: 400,
        });
    });

    it("Should be impossible create a admin with email already exists", async () => {
        const { sut } = makeSut();

        const admin = {
            name: "teste da silva",
            email: "teste@gmail.com",
            password: "teste",
        };

        await sut.execute(admin);

        await expect(async () => {
            await sut.execute(admin);
        }).rejects.toMatchObject({
            message: "Email is not valid",
            statusCode: 400,
        });
    });
});
