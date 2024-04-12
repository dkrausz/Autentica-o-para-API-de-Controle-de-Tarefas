import { Router } from "express";
import { categoryController } from "../controllers";


export const categoriesRoutes = Router();

const categoriesController = new categoryController();

// tasksRoute.get("/", ensure.existCategory,tasksController.getTaks);
categoriesRoutes.get("/",categoriesController.getCategories);