import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { VerifyTokenUseCase } from "./VerifyTokenUseCase";

const adminsRepository = new AdminsRepository();
const clientsRepository = new ClientsRepository();
const verifyTokenUseCase = new VerifyTokenUseCase(
    adminsRepository,
    clientsRepository,
);

export { verifyTokenUseCase };
