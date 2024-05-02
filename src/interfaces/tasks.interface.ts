import { z } from "zod";
import { TaskSchema,TaskCreateSchema } from "../schemas";
import { TaskReturnBody, TaskUpdateSchema } from "../schemas/tasks.schema";

type TTask = z.infer<typeof TaskSchema>;
type TCreateTask = z.infer<typeof TaskCreateSchema>;
type TUpdateTask= z.infer<typeof TaskUpdateSchema>;
type TReturnBody = z.infer<typeof TaskReturnBody>

interface ITasksService{
    getTasks( id:number,category?:string):Promise<Array<TReturnBody>>
    getOneTask(task:TTask, id:number):Promise<TTask>
    addTask(newTask:TCreateTask):Promise<TTask>
    updateTask(UserId:number,id:number, updatedTask:TUpdateTask):Promise<TTask>
    deleteTask(taskId:number,id:number):Promise<void>

}

export {TTask, TCreateTask,TUpdateTask,ITasksService,TReturnBody};
