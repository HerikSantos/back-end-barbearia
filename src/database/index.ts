import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

import { env } from "../utils/enviroment";

dotenv.config({
    path: path.resolve(__dirname, "..", "..", ".env.dev"),
});

const appDataSource = new DataSource({
    type: "mysql",
    host: env.DATABASE_HOST,
    port: 3306,
    database: env.DATABASE,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
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
