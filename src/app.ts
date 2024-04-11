import express, { json } from "express";
import helmet from "helmet";
import { tasksRoute } from "./routes";

export const app = express();

app.use(json());
app.use(helmet());

app.use("/tasks", tasksRoute);

