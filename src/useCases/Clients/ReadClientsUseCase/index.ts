import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { ReadClientsUseCase } from "./ReadClientsUseCase";

const clientsRepository = new ClientsRepository();
const readClientesUseCase = new ReadClientsUseCase(clientsRepository);

export { readClientesUseCase };
