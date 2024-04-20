import express from "express";

import "reflect-metadata";
import { route } from "./routes/clientesRoutes";

const app = express();

app.use(express.json());
app.use(route);

export { app };
