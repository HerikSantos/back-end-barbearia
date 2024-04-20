import { type Clientes } from "../database/entities/Clientes";

interface IRequest {
    id?: string;
    name: string;
    qtd_cortes: number;
    data_nasc: string;
}

interface IClienteRepository {
    create: ({ data_nasc, name, qtd_cortes }: IRequest) => Promise<void>;
    findLike: ({
        name,
        data_nasc,
    }: {
        name?: string;
        data_nasc?: string;
    }) => Promise<Clientes[] | Clientes>;
    edit: ({
        id,
        name,
        data_nasc,
        qtd_cortes,
    }: {
        name?: string;
        id?: string;
        data_nasc?: string;
        qtd_cortes?: number;
    }) => Promise<Clientes>;
    delete: (id: string) => Promise<void>;
    findByID: (id: string) => Promise<Clientes>;
    findAll: ({
        name,
        data_nasc,
    }: {
        name?: string;
        data_nasc?: string;
    }) => Promise<Clientes[] | Clientes | undefined>;
}

export type { IClienteRepository, IRequest };
