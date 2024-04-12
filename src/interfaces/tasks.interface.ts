import { z } from "zod";
import { TaskSchema,TaskCreateSchema } from "../schemas";
import { TaskUpdateSchema } from "../schemas/tasks.schema";

type TTask = z.infer<typeof TaskSchema>;
type TCreateTask = z.infer<typeof TaskCreateSchema>;
type TUpdateTask= z.infer<typeof TaskUpdateSchema>;

export {TTask, TCreateTask,TUpdateTask};
