import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  ITasksService,
  TCreateTask,
  TReturnBody,
  TTask,
  TUpdateTask,
} from "../interfaces";
import { TaskReturnBody } from "../schemas";
import { AppError } from "../errors/AppError";

@injectable()
export class TasksServices implements ITasksService {
  // getTasks = async (id:number, locals?: Array<TTask>): Promise<Array<TTask>> => {
  //   if (locals) {
  //     return locals;
  //   }
  //   return await prisma.task.findMany({include:{category:true}});
  // };

  getTasks = async (
    id: number,
    category?: string
  ): Promise<Array<TReturnBody>> => {
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

  getOneTask = async (task: TTask): Promise<TTask> => {
    return task;
  };

  addTask = async (newTask: TCreateTask): Promise<TTask> => {
    console.log(newTask);

    return await prisma.task.create({ data: newTask });
  };

  updateTask = async (id: number, updatedTask: TUpdateTask): Promise<TTask> => {
    return await prisma.task.update({ where: { id }, data: updatedTask });
  };

  deleteTask = async (id: number) => {
    await prisma.task.delete({ where: { id } });
  };
}
