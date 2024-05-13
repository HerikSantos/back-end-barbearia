import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

const clientRepository = new ClientsRepository();
const deleteClienteUseCase = new DeleteClientUseCase(clientRepository);

export { deleteClienteUseCase };
