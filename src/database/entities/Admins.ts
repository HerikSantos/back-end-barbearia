import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
class Admins {
    @PrimaryColumn({
        length: "36",
    })
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt?: Date;

    @CreateDateColumn()
    updateAt?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Admins };
