import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

const adminsRepository = new AdminsRepository();
const createAdminUseCase = new CreateAdminUseCase(adminsRepository);

export { createAdminUseCase };
