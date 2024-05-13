import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

const clientsRepository = new ClientsRepository();
const updateClientUseCase = new UpdateClientUseCase(clientsRepository);

export { updateClientUseCase };
