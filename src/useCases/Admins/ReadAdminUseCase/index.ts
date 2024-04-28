import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { ReadAdminUseCase } from "./ReadAdminUseCase";

const adminsRepository = new AdminsRepository();
const readAdminUseCase = new ReadAdminUseCase(adminsRepository);

export { readAdminUseCase };
