import { ClienteRepository } from "../../repositories/ClientesRepository";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

const clienteRepository = new ClienteRepository();
const updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);

export { updateClienteUseCase };
