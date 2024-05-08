import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { categoriesRoutes, tasksRoute, userRoute } from "./routes";
import { handleErrors } from "./middlewares/handleErrorsMiddlewares";


export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use("/tasks", tasksRoute);
app.use("/categories", categoriesRoutes);
app.use("/users",userRoute);

app.use(handleErrors);

