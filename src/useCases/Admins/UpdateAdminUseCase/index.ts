import { AdminsRepository } from "../../../repositories/AdminsRepository";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

const adminsRepository = new AdminsRepository();
const updateAdminUseCase = new UpdateAdminUseCase(adminsRepository);

export { updateAdminUseCase };
