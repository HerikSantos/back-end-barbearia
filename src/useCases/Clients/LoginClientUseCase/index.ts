import { ClientsRepository } from "../../../repositories/ClientsRepository";
import { LoginClientUseCase } from "./LoginClientUseCase";

const clientRepository = new ClientsRepository();
const loginClientUseCase = new LoginClientUseCase(clientRepository);

export { loginClientUseCase };
