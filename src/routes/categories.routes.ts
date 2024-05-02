import { Router } from "express";
import { CategoryController } from "../controllers";
import { authMiddleware, ensure } from "../middlewares";
import { CategoriesCreateSchema} from "../schemas";
import { container } from "tsyringe";
import { CategoriesServices } from "../services";


export const categoriesRoutes = Router();
container.registerSingleton("CategoriesService",CategoriesServices);

 const categoriesController = container.resolve(CategoryController);


categoriesRoutes.get("/",categoriesController.getCategories);
categoriesRoutes.post("/",authMiddleware.isAuth,ensure.bodyIsValid(CategoriesCreateSchema),categoriesController.addCategory);
categoriesRoutes.delete("/:id",authMiddleware.isAuth, ensure.existCategoryByParams, categoriesController.deleteCategory)