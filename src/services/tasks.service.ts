import { prisma } from "../database/prisma";
import { TCreateTask, TTask, TUpdateTask } from "../interfaces";

export class TasksServices {

  getTasks = async (locals?: Array<TTask>): Promise<Array<TTask>> => {
    if (locals) {
      return locals;
    }
    return await prisma.task.findMany({include:{category:true}});
  };

  getOneTask = async (task: TTask): Promise<TTask> => {
    return task;
  };

  addTask = async (newTask: TCreateTask): Promise<TTask> => {
     return await prisma.task.create({ data: newTask });
  };

  updateTask = async (task: TTask,updatedTask: TUpdateTask): Promise<TTask> => {
    const { id } = task;
  
    return await prisma.task.update({ where: { id:id }, data: updatedTask });      
       
  };

  deleteTask = async (id: number) => {
    return await prisma.task.delete({ where: { id } });
  };
}
