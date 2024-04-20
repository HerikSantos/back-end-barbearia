import { type Repository } from "typeorm";

import { appDataSource } from "../database";
import { Clientes } from "../database/entities/Clientes";
import { AppError } from "../errors/AppErros";
import { type IClienteRepository } from "./IClientesRepository";

interface IRequest {
    id: string;
    name: string;
    data_nasc: string;
    qtd_cortes: number;
}

class ClienteRepository implements IClienteRepository {
    repository: Repository<Clientes>;

    constructor() {
        this.repository = appDataSource.getRepository(Clientes);
    }

    async create({ data_nasc, name, qtd_cortes }: IRequest): Promise<void> {
        const cliente = this.repository.create({
            data_nasc,
            name,
            qtd_cortes,
        });

        await this.repository.save(cliente);
    }

    async findAll(): Promise<Clientes[] | Clientes | undefined> {
        const clientes = await this.repository.find();

        return clientes;
    }

    async edit({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: IRequest): Promise<Clientes> {
        const cliente = await this.findByID(id);

        Object.assign(cliente, { name, data_nasc, qtd_cortes });

        const newClient = await this.repository.save(cliente);

        return newClient;
    }

    delete: (id: string) => Promise<void>;
    async findByID(id: string): Promise<Clientes> {
        const cliente = await this.repository.findOneBy({
            id,
        });

        if (!cliente) throw new AppError("Client not found", 400);

        return cliente;
    }

    async findLike({
        name,
        data_nasc,
    }: {
        name?: string;
        data_nasc?: string;
    }): Promise<Clientes[] | Clientes> {
        const client: Clientes[] = await this.repository
            .createQueryBuilder()
            .select("*")
            .where(`name="${name}"`)
            .getRawMany();
        return client;
    }
}

export { ClienteRepository };
