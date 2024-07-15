import { app } from ".";
import { appDataSource } from "./database";
import { env } from "./utils/enviroment";

appDataSource
    .initialize()
    .then(() =>
        app.listen(env.PORT ?? 3333, () => {
            console.log("rodando na porta " + env.PORT ?? 3333);
        }),
    )
    .catch((err: Error) => {
        console.log(`Algo deu errado com o banco de dados ${err.stack}`);
    });
