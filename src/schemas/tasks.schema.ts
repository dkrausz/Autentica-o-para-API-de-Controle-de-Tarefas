import {z} from "zod";

export const TaskSchema= z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number()
});

export const TaskCreateSchema = TaskSchema.omit({ id: true });

// model Task{
//     id Int @id @default(autoincrement())
//     title String
//     content String
//     finished Boolean @default(false)
//     categoryId Int? 
//     category Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
//   }