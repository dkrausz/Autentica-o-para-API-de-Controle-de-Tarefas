import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  ITasksService,
  TCreateTask,
  TReturnBody,
  TTask,
  TUpdateTask,
} from "../interfaces";
import { TaskReturnBody, TaskSchema } from "../schemas";
import { AppError } from "../errors/AppError";

@injectable()
export class TasksServices implements ITasksService {

  isOwner=async(userId:number,taskId:number):Promise<void>=>{
   const owner= await prisma.task.findFirst({where:{id:taskId,userId:userId}});
     
   if(owner==null){
    throw new AppError("This user is not the task owner",403);
   }
  
  }


  getTasks = async (id: number,category?: string): Promise<Array<TReturnBody>> => {
    
    if (category) {
      const tasks = await prisma.task.findMany({
        where: {
          category: {
            name: { equals: category as string, mode: "insensitive" },
          },
          userId: id,
        },
        include: { category: true },
      });

      if (tasks.length <= 0) {
        throw new AppError("Category not found", 404);
      }
      return TaskReturnBody.array().parse(tasks);
    }

    const tasks = await prisma.task.findMany({
      where: { userId: id },
      include: { category: true },
    });

    return TaskReturnBody.array().parse(tasks);
  };

  getOneTask = async (task: TTask,id:number): Promise<TTask> => {
        
   await this.isOwner(id,task.id)  
    return TaskSchema.parse(task);
  };


  addTask = async (newTask: TCreateTask): Promise<TTask> => {
    
    return await prisma.task.create({ data: newTask });
  };

  updateTask = async (userId:number, id: number, updatedTask: TUpdateTask): Promise<TTask> => {
    await this.isOwner(userId,id);
    return await prisma.task.update({ where: { id }, data: updatedTask });
  };

  deleteTask = async (taskId:number,id: number) => {   
   
    await this.isOwner(id,taskId);
    await prisma.task.delete({ where: { id:taskId } });
  };
}
