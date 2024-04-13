import { Router } from "express";
import { categoryController } from "../controllers";
import { ensure } from "../middlewares";
import { CategoriesCreateSchema} from "../schemas";


export const categoriesRoutes = Router();

const categoriesController = new categoryController();


categoriesRoutes.get("/",categoriesController.getCategories);
categoriesRoutes.post("/",ensure.bodyIsValid(CategoriesCreateSchema),categoriesController.addCategory);
categoriesRoutes.delete("/:id", ensure.existCategoryByParams, categoriesController.deleteCategory)