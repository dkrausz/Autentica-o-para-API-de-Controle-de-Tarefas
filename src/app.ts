import express, { json } from "express";
import helmet from "helmet";
import { categoriesRoutes, tasksRoute } from "./routes";
import { handleErrors } from "./middlewares/handleErrorsMiddlewares";

export const app = express();

app.use(json());
app.use(helmet());

app.use("/tasks", tasksRoute);
app.use("/categories", categoriesRoutes);

app.use(handleErrors);

