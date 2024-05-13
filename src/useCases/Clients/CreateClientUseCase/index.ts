import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { CreateClientUseCase } from "./CreateClientUseCase";

const clientsRepository = new ClientsRepository();
const createClientUseCase = new CreateClientUseCase(clientsRepository);

export { createClientUseCase };
