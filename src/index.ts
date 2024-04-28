import express from "express";
import "express-async-errors";

import "reflect-metadata";
import { errorPrevent } from "./middleware/errorPrevent";
import { routeAdmin } from "./routes/adminsRoutes";
import { route } from "./routes/clientesRoutes";

const app = express();

app.use(express.json());
app.use(route);
app.use(routeAdmin);
app.use(errorPrevent);

export { app };
