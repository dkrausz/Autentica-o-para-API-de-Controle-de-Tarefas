import { z } from "zod";
import { CategoriesSchema,CategoriesCreateSchema } from "../schemas";

type TCategory = z.infer<typeof CategoriesSchema>;
type TCreateCategory = z.infer<typeof CategoriesCreateSchema>;

export {TCategory, TCreateCategory};