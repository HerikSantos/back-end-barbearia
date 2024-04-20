import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
class Clientes {
    @PrimaryColumn({
        length: "36",
    })
    id: string;

    @Column()
    name: string;

    @Column()
    qtd_cortes: number;

    @Column()
    data_nasc: Date;

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

export { Clientes };
