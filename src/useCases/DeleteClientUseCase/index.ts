import { ClienteRepository } from "../../repositories/ClientesRepository";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

const clientRepository = new ClienteRepository();
const deleteClienteUseCase = new DeleteClientUseCase(clientRepository);

export { deleteClienteUseCase };
