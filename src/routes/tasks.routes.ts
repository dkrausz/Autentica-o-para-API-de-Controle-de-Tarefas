import { Router } from "express";
import { taskController } from "../controllers";

export const tasksRoute = Router();

const tasksController = new taskController();

tasksRoute.get("/", tasksController.getTaks);
