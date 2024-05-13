import { Admins } from "../database/entities/Admins";
import { AppError } from "../errors/AppErros";
import {
    type IAdminsRepository,
    type IRequestAdmin,
} from "./IAdminsRepository";

class AdminsRepositoryMemory implements IAdminsRepository {
    private readonly repositoryMemory: Admins[] = [];

    async create({ name, email, password }: IRequestAdmin): Promise<void> {
        const admins = new Admins();

        const admin = {
            name,
            email,
            password,
        };

        Object.assign(admins, admin);

        this.repositoryMemory.push(admins);
    }

    async findOne({ email }: { email: string }): Promise<Admins | null> {
        const findedAdmin = this.repositoryMemory.find((admin) => {
            return admin.email === email;
        });
        if (!findedAdmin) return null;
        return findedAdmin;
    }

    async edit({
        id,
        name,
        email,
        password,
    }: {
        name?: string | undefined;
        id: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
    }): Promise<Admins | null> {
        const editAdmin = {
            name,
            email,
            password,
        };

        const editedAdmin = this.repositoryMemory.map((admin) => {
            let returnAdminIfExists;
            if (admin.id === id) {
                for (const key in editAdmin) {
                    if (Object.keys(admin).includes(key)) {
                        admin[key] = editAdmin[key] ?? admin[key];
                    }
                }
                returnAdminIfExists = admin;
                return returnAdminIfExists;
            }
            return returnAdminIfExists;
        });

        if (Object.values(editedAdmin).includes(undefined))
            throw new AppError("User not found", 400);

        return editedAdmin[0];
    }

    async delete(id: string): Promise<void> {
        this.repositoryMemory.map((admin, index) => {
            if (admin.id === id) {
                this.repositoryMemory.splice(index, 1);
            }
            return admin;
        });
    }

    async findByID(id: string): Promise<Admins | null> {
        const admin = this.repositoryMemory.find((admin) => admin.id === id);

        if (!admin) return null;

        return admin;
    }

    async findAll(): Promise<Admins[]> {
        return this.repositoryMemory;
    }
}

export { AdminsRepositoryMemory };
