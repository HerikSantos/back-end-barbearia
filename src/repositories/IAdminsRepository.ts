import { type Admins } from "../database/entities/Admins";

interface IRequestAdmin {
    name: string;
    email: string;
    password: string;
}

interface IAdminsRepository {
    create: ({ name, email, password }: IRequestAdmin) => Promise<void>;
    findAll: () => Promise<Admins[]>;
    edit: ({
        id,
        name,
        email,
        password,
    }: {
        id: string;
        name?: string;
        email?: string;
        password?: string;
    }) => Promise<Admins | null>;
    delete: (id: string) => Promise<void>;
    findByID: (id: string) => Promise<Admins | null>;
    findOne: ({ email }: { email: string }) => Promise<Admins | null>;
}

export type { IAdminsRepository, IRequestAdmin };
