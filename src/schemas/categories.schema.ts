import {z} from "zod";

export const CategoriesSchema= z.object({
    id: z.number().positive(),
    name: z.string().min(1)
    });

export const CategoriesCreateSchema= CategoriesSchema.pick({name:true});
export const CategoriesReturnSchema = CategoriesSchema.extend({userId:z.number()});

