import {z} from "zod";

export const CategoriesSchema= z.object({
    id: z.number().positive(),
    name: z.string().min(1)
    });

export const CategoriesCreateSchema= CategoriesSchema.pick({name:true});

// model Category{
//     id Int @id @default(autoincrement())
//     name String
//     tasks Task[]
//   }