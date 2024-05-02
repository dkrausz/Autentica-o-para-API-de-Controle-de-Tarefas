import { Router } from "express";
import { CategoryController } from "../controllers";
import { ensure } from "../middlewares";
import { CategoriesCreateSchema} from "../schemas";
import { container } from "tsyringe";
import { CategoriesServices } from "../services";


export const categoriesRoutes = Router();
container.registerSingleton("CategoriesService",CategoriesServices);

 const categoriesController = container.resolve(CategoryController);


categoriesRoutes.get("/",categoriesController.getCategories);
categoriesRoutes.post("/",ensure.bodyIsValid(CategoriesCreateSchema),categoriesController.addCategory);
categoriesRoutes.delete("/:id", ensure.existCategoryByParams, categoriesController.deleteCategory)