import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { DeleteAdminUseCase } from "./DeleteAdminUseCase";

const adminsRepository = new AdminsRepository();
const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository);

export { deleteAdminUseCase };
