import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { LoginAdminUseCase } from "./LoginAdminUseCase";

const adminsRepository = new AdminsRepository();
const loginAdminUseCase = new LoginAdminUseCase(adminsRepository);

export { loginAdminUseCase };
