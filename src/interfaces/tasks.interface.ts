import { z } from "zod";
import { TaskSchema,TaskCreateSchema } from "../schemas";

type TTask = z.infer<typeof TaskSchema>;
type TCreateTask = z.infer<typeof TaskCreateSchema>;

export {TTask, TCreateTask};

