import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

dotenv.config({
    path: path.resolve(__dirname, "..", "..", ".env.dev"),
});

console.log(process.env.NODE_ENV);

const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [
        process.env.NODE_ENV
            ? "./dist/database/entities/*.js"
            : "./src/database/entities/*.ts",
    ],
    subscribers: [],
    migrations: [
        process.env.NODE_ENV
            ? "./dist/database/migrations/*.js"
            : "./src/database/migrations/*.ts",
    ],
});

export { appDataSource };
