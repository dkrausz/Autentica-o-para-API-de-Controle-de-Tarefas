import { z } from "zod";
import { CategoriesSchema,CategoriesCreateSchema, CategoriesReturnSchema } from "../schemas";

type TCategory = z.infer<typeof CategoriesSchema>;
type TCreateCategory = z.infer<typeof CategoriesCreateSchema>;
type TCategoryReturnBody = z.infer<typeof CategoriesReturnSchema>;

interface ICategoryService{
    getCategories():Promise<Array<TCategory>>;
    addCategory(newCategory:TCreateCategory):Promise<TCategoryReturnBody>;
    deleteCategory(categoryId:Number, userId:number):Promise<void>;
}

export {TCategory, TCreateCategory,ICategoryService,TCategoryReturnBody};