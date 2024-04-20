import { DataSource } from "typeorm";

const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "barbearia",
    username: "root",
    password: "123456",
    synchronize: true,
    logging: true,
    entities: ["./src/database/entities/*.ts"],
    subscribers: [],
    migrations: ["./src/database/migrations/*.ts"],
});

export { appDataSource };
