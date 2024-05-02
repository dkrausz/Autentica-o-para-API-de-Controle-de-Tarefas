import { z } from "zod";
import { CategoriesSchema,CategoriesCreateSchema } from "../schemas";

type TCategory = z.infer<typeof CategoriesSchema>;
type TCreateCategory = z.infer<typeof CategoriesCreateSchema>;

interface ICategoryService{
    getCategories():Promise<Array<TCategory>>;
    addCategory(newCategory:TCreateCategory):Promise<TCategory>;
    deleteCategory(categoryId:Number, userId:number):Promise<void>;
}

export {TCategory, TCreateCategory,ICategoryService};