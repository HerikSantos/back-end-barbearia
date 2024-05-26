import { type Clientes } from "../database/entities/Clientes";

interface IRequest {
    id?: string;
    name: string;
    qtd_cortes: number;
    data_nasc: Date;
}

interface IClientsRepository {
    create: ({ data_nasc, name, qtd_cortes }: IRequest) => Promise<void>;
    findLike: ({ name }: { name?: string }) => Promise<Clientes[]>;
    edit: ({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: {
        id: string;
        name?: string;
        data_nasc?: Date;
        qtd_cortes?: number;
    }) => Promise<Clientes | null>;
    delete: (id: string) => Promise<void>;
    findByID: (id: string) => Promise<Clientes | null>;
    findOne: ({
        name,
        data_nasc,
    }: {
        name: string;
        data_nasc: Date;
    }) => Promise<Clientes | null>;
}

export type { IClientsRepository, IRequest };
