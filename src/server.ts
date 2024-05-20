import dotenv from "dotenv";
import path from "path";

import { app } from ".";
import { appDataSource } from "./database";

dotenv.config({
    path: path.resolve("..", ".env.dev"),
});

const port = process.env.PORT;

appDataSource
    .initialize()
    .then(() =>
        app.listen(port ?? 3333, () => {
            console.log("rodando na porta " + port ?? 3333);
        }),
    )
    .catch((err: Error) => {
        console.log(`Algo deu errado com o banco de dados ${err.stack}`);
    });
