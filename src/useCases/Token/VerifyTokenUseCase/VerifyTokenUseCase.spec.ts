import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { AppError } from "../../../errors/AppErros";
import { AdminsRepositoryMemory } from "../../../repositories/AdminsRepositoryMemory";
import { ClientsRepositoryMemory } from "../../../repositories/ClientsRepositoryMemory";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { LoginAdminUseCase } from "../../Admins/LoginAdminUseCase/LoginAdminUseCase";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";

interface ITypesSut {
    sut: VerifyTokenUseCase;
    adminRepository: IAdminsRepository;
    clientRepository: IClientsRepository;
    loginAdminUseCase: LoginAdminUseCase;
}

function makeSut(): ITypesSut {
    const clientRepository = new ClientsRepositoryMemory();
    const adminRepository = new AdminsRepositoryMemory();
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository);
    const sut = new VerifyTokenUseCase(adminRepository, clientRepository);

    return {
        sut,
        clientRepository,
        adminRepository,
        loginAdminUseCase,
    };
}

jest.mock("uuid", () => ({
    v4: jest.fn().mockReturnValue("valid_id"),
}));

describe("Verify token", () => {
    describe("Verify token admin", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("Should throw if token is invalid", async () => {
            const { sut } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
                throw new JsonWebTokenError("invalid token");
            });

            await expect(async () => {
                await sut.verifyTokenAdmin("invalid_token");
            }).rejects.toEqual(new AppError("Token invalid", 400));
        });

        it("Should return a error with statusCode 500 if unexpected error", async () => {
            const { sut, adminRepository } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "invalid_id",
            }));

            jest.spyOn(adminRepository, "findByID").mockImplementationOnce(
                () => {
                    throw new Error("Generic Error");
                },
            );

            await expect(async () => {
                await sut.verifyTokenAdmin("invalid_token");
            }).rejects.toEqual(new AppError("Internal Error", 500));
        });

        it("Should throw if id is invalid", async () => {
            const { sut } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "invalid_id",
            }));

            await expect(async () => {
                await sut.verifyTokenAdmin("invalid_token");
            }).rejects.toEqual(new AppError("Token invalid", 400));
        });

        it("Should call findById with correct params", async () => {
            const { sut, adminRepository } = makeSut();

            const admin = {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email",
                password: "valid_password",
            };

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: admin.id,
            }));

            const findByIdSpy = jest
                .spyOn(adminRepository, "findByID")
                .mockResolvedValueOnce(admin);

            await sut.verifyTokenAdmin("valid_token");

            expect(findByIdSpy).toHaveBeenCalledWith(admin.id);
        });

        it("Should verify token success", async () => {
            const { sut, adminRepository } = makeSut();

            const admin = {
                name: "valid_name",
                email: "valid_email",
                password: "valid_password",
            };

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "valid_id",
            }));

            await adminRepository.create(admin);

            expect(async () => {
                await sut.verifyTokenAdmin("valid_token");
            });
        });

        it("Should return a throw if none repository is passed", async () => {
            const verifiToken = new VerifyTokenUseCase();

            await expect(async () => {
                await verifiToken.verifyTokenAdmin("any_token");
            }).rejects.toEqual(
                new AppError("Almost one repository is required"),
            );
        });
    });

    describe("Verify token client", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        });

        it("Should throw if token is invalid", async () => {
            const { sut } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
                throw new JsonWebTokenError("invalid token");
            });

            await expect(async () => {
                await sut.verifyTokenClient("invalid_token");
            }).rejects.toEqual(new AppError("Token invalid", 400));
        });

        it("Should return a error with statusCode 500 if unexpected error", async () => {
            const { sut, clientRepository } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "invalid_id",
            }));

            jest.spyOn(clientRepository, "findByID").mockImplementationOnce(
                () => {
                    throw new Error("Generic Error");
                },
            );

            await expect(async () => {
                await sut.verifyTokenClient("invalid_token");
            }).rejects.toEqual(new AppError("Internal Error", 500));
        });

        it("Should throw if id is invalid", async () => {
            const { sut } = makeSut();

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "invalid_id",
            }));

            await expect(async () => {
                await sut.verifyTokenClient("invalid_token");
            }).rejects.toEqual(new AppError("Token invalid", 400));
        });

        it("Should call findById with correct params", async () => {
            const { sut, clientRepository } = makeSut();

            const client = {
                id: "valid_id",
                name: "valid_name",
                qtd_cortes: 2,
                data_nasc: new Date("2000-04-02"),
            };

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: client.id,
            }));

            const findByIdSpy = jest
                .spyOn(clientRepository, "findByID")
                .mockResolvedValueOnce(client);

            await sut.verifyTokenClient("valid_token");

            expect(findByIdSpy).toHaveBeenCalledWith(client.id);
        });

        it("Should verify token success", async () => {
            const { sut, clientRepository } = makeSut();

            const client = {
                name: "valid_name",
                qtd_cortes: 2,
                data_nasc: new Date("2000-04-02"),
            };

            jest.spyOn(jwt, "verify").mockImplementationOnce(() => ({
                id: "valid_id",
            }));

            await clientRepository.create(client);

            expect(async () => {
                await sut.verifyTokenClient("valid_token");
            });
        });

        it("Should return a throw if none repository is passed", async () => {
            const verifiToken = new VerifyTokenUseCase();

            await expect(async () => {
                await verifiToken.verifyTokenClient("any_token");
            }).rejects.toEqual(
                new AppError("Almost one repository is required"),
            );
        });
    });
});
