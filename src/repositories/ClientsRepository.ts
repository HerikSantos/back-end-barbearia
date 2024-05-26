import { type Repository } from "typeorm";

import { appDataSource } from "../database";
import { Clientes } from "../database/entities/Clientes";
import { type IClientsRepository } from "./IClientsRepository";

interface IRequest {
    id: string;
    name: string;
    data_nasc: Date;
    qtd_cortes: number;
}

class ClientsRepository implements IClientsRepository {
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

    async findOne({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: Date;
    }): Promise<Clientes | null> {
        // const data_nascString = removeTimeZone(new Date(data_nasc));

        const client = await this.repository.findOneBy({
            name,
            data_nasc,
        });

        return client;
    }

    async edit({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: {
        id: string;
        name?: string;
        data_nasc?: Date;
        qtd_cortes?: number;
    }): Promise<Clientes | null> {
        const cliente = await this.findByID(id);

        if (!cliente) {
            return cliente;
        }

        Object.assign(cliente, { name, data_nasc, qtd_cortes });

        const newClient = await this.repository.save(cliente);

        const result = await this.repository.findOne({
            where: { id: newClient.id },
        });

        return result;
    }

    async delete(id: string): Promise<void> {
        const clientExists = await this.findByID(id);

        if (clientExists) {
            await this.repository.remove(clientExists);
        }
    }

    async findByID(id: string): Promise<Clientes | null> {
        const cliente = await this.repository.findOneBy({
            id,
        });

        return cliente;
    }

    async findLike({
        name,
    }: {
        name?: string;
        data_nasc?: Date;
    }): Promise<Clientes[]> {
        const client: Clientes[] = await this.repository
            .createQueryBuilder()
            .select("*")
            .where(`name LIKE "%${name ?? ""}"`)
            .getRawMany();
        return client;
    }
}

export { ClientsRepository };
