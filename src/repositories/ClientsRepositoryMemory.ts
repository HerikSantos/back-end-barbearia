import { Clientes } from "../database/entities/Clientes";
import { AppError } from "../errors/AppErros";
import { type IClientsRepository, type IRequest } from "./IClientsRepository";

class ClientsRepositoryMemory implements IClientsRepository {
    private readonly repositoryMemory: Clientes[] = [];

    async create({ data_nasc, name, qtd_cortes }: IRequest): Promise<void> {
        const clientes = new Clientes();
        const cliente = {
            data_nasc,
            name,
            qtd_cortes,
        };

        Object.assign(clientes, cliente);

        this.repositoryMemory.push(clientes);
    }

    async findOne({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: Date;
    }): Promise<Clientes | null> {
        const findedClient = this.repositoryMemory.find((cliente) => {
            return cliente.name === name && cliente.data_nasc === data_nasc;
        });
        if (!findedClient) return null;
        return findedClient;
    }

    async edit({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: {
        name?: string | undefined;
        id: string | undefined;
        data_nasc?: Date | undefined;
        qtd_cortes?: number | undefined;
    }): Promise<Clientes | null> {
        const editClient = {
            name,
            data_nasc,
            qtd_cortes,
        };

        const editedClient = this.repositoryMemory.map((cliente) => {
            let returnClienteIfExists;
            if (cliente.id === id) {
                for (const key in editClient) {
                    if (Object.keys(cliente).includes(key)) {
                        cliente[key] = editClient[key] ?? cliente[key];
                    }
                }
                returnClienteIfExists = cliente;
                return returnClienteIfExists;
            }
            return returnClienteIfExists;
        });

        if (Object.values(editedClient).includes(undefined))
            throw new AppError("User not found", 400);

        return editedClient[0];
    }

    async delete(id: string): Promise<void> {
        this.repositoryMemory.map((client, index) => {
            if (client.id === id) {
                this.repositoryMemory.splice(index, 1);
            }
            return client;
        });
    }

    async findByID(id: string): Promise<Clientes | null> {
        const client = this.repositoryMemory.find((client) => client.id === id);

        if (!client) return null;

        return client;
    }

    async findLike({
        name,
    }: {
        name?: string;
    }): Promise<Clientes[] | Clientes> {
        return this.repositoryMemory;
    }
}

export { ClientsRepositoryMemory };
