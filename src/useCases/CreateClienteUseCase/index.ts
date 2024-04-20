import { ClienteRepository } from "../../repositories/ClientesRepository";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

const clienteRepository = new ClienteRepository();
const createClienteUseCase = new CreateClienteUseCase(clienteRepository);

export { createClienteUseCase };
