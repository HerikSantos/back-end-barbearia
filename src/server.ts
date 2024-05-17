import { app } from ".";
import { appDataSource } from "./database";

appDataSource
    .initialize()
    .then(() =>
        app.listen(3333, () => {
            console.log("rodando na porta 3333");
        }),
    )
    .catch((err: Error) => {
        console.log(`Algo deu errado com o banco de dados ${err.stack}`);
    });
