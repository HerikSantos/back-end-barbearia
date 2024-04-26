import { ClienteRepository } from "../../repositories/ClientesRepository";
import { ReadClientesUseCase } from "./ReadClientesUseCase";

const clienteRepository = new ClienteRepository();
const readClientesUseCase = new ReadClientesUseCase(clienteRepository);

export { readClientesUseCase };
