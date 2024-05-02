import { Request, Response } from "express";
import { TasksServices } from "../services";
import { inject, injectable } from "tsyringe";
import { ITasksService } from "../interfaces";

@injectable()
export class taskController {
  constructor(@inject("TasksServices") private taskService: ITasksService) {}

  public getTasks = async (req: Request, res: Response): Promise<Response> => {
  
    const {id}=res.locals.decoded;
    const {category} = req.query;
           
    const tasks = await this.taskService.getTasks(id,category as string);
    return res.status(200).json(tasks);
  };

  public getOneTask = async (req: Request, res: Response): Promise<Response> => {
    const { task } = res.locals;
    const {id} = res.locals.decoded;
    const response = await this.taskService.getOneTask(task,id);
    return res.status(200).json(response);
  };

  public addTask = async (req: Request, res: Response): Promise<Response> => {
    const newTask = req.body;
  
    newTask.userId = res.locals.decoded.id;       
    const tasks = await this.taskService.addTask(newTask);
    return res.status(201).json(tasks);
  };

  public updateTask = async (req: Request, res: Response):Promise<Response> => {
    const  taskId  = req.params.id;
    const {id} = res.locals.decoded;
    const updatedTask = req.body;
    const response = await this.taskService.updateTask(id, Number(taskId), updatedTask);
    return res.status(200).json(response);
  };

  public deleteTask = async (req: Request,res: Response): Promise<Response> => {
    const taskId = res.locals.task.id;
    const {id} = res.locals.decoded;
    await this.taskService.deleteTask(taskId,id);
    return res.status(204).json();
  };
}
