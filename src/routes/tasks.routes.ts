import { Router } from "express";
import {  TaskCreateSchema } from "../schemas";
import { authMiddleware, ensure } from "../middlewares";
import { TaskUpdateSchema } from "../schemas/tasks.schema";
import { container } from "tsyringe";
import { TasksServices } from "../services";
import { taskController } from "../controllers";


export const tasksRoute = Router();
container.registerSingleton("TasksServices" , TasksServices);

const tasksController =container.resolve(taskController);

tasksRoute.get("/",authMiddleware.isAuth,tasksController.getTasks);
tasksRoute.get("/:id",ensure.existTask,tasksController.getOneTask);
tasksRoute.post("/",authMiddleware.isAuth,ensure.bodyIsValid(TaskCreateSchema),ensure.existCategoryById,tasksController.addTask);
tasksRoute.patch("/:id",ensure.existTask,ensure.bodyIsValid(TaskUpdateSchema),ensure.existCategoryById,tasksController.updateTask);
tasksRoute.delete("/:id",ensure.existTask,tasksController.deleteTask);