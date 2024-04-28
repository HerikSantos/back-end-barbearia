import { type Repository } from "typeorm";

import { appDataSource } from "../database";
import { Admins } from "../database/entities/Admins";
import {
    type IAdminsRepository,
    type IRequestAdmin,
} from "./IAdminsRepository";

class AdminsRepository implements IAdminsRepository {
    repository: Repository<Admins>;
    constructor() {
        this.repository = appDataSource.getRepository(Admins);
    }

    async create({ name, email, password }: IRequestAdmin): Promise<void> {
        const admin = this.repository.create({
            name,
            email,
            password,
        });

        await this.repository.save(admin);
    }

    async findLike({
        email,
    }: {
        email?: string;
    }): Promise<Admins | Admins[] | null> {
        if (email) {
            const admins = await this.repository.findOneBy({
                email,
            });
            return admins;
        }

        const admins = await this.repository.find();
        return admins;
    }

    async edit({
        id,
        name,
        email,
        password,
    }: {
        id: string;
        name?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
    }): Promise<Admins | null> {
        const admin = await this.findByID(id);

        if (!admin) {
            return admin;
        }

        Object.assign(admin, { name, email, password });

        const editedAdmin = await this.repository.save(admin);

        return editedAdmin;
    }

    async delete(id: string): Promise<void> {
        const admin = await this.repository.findOneBy({
            id,
        });

        if (admin) {
            await this.repository.remove(admin);
        }
    }

    async findByID(id: string): Promise<Admins | null> {
        const admin = await this.repository.findOneBy({
            id,
        });

        return admin;
    }
}
export { AdminsRepository };
