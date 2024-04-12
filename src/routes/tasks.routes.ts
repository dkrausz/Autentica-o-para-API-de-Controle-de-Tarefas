import { Router } from "express";
import { taskController } from "../controllers";
import { TaskSchema, TaskCreateSchema } from "../schemas";
import { ensure } from "../middlewares";
import { TaskUpdateSchema } from "../schemas/tasks.schema";


export const tasksRoute = Router();

const tasksController = new taskController();

tasksRoute.get("/", ensure.existCategory,tasksController.getTaks);
tasksRoute.get("/:id",ensure.existTask,tasksController.getOneTask);
tasksRoute.post("/",ensure.bodyIsValid(TaskCreateSchema),ensure.existCategory,tasksController.addTask);
tasksRoute.patch("/:id",ensure.existTask,ensure.bodyIsValid(TaskUpdateSchema),ensure.existCategory,tasksController.updateTask);
tasksRoute.delete("/:id",ensure.existTask,tasksController.deleteTask);