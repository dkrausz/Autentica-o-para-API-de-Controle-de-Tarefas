import {z} from "zod";
import { CategoriesSchema } from "./categories.schema";

export const TaskSchema= z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish()
});

export const TaskCreateSchema = TaskSchema.omit({ id: true });
export const TaskUpdateSchema = TaskSchema.omit({id:true}).partial();

export const TaskReturnBody = TaskSchema.extend({category:CategoriesSchema.nullish()});