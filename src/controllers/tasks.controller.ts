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
    const response = await this.taskService.getOneTask(task);
    return res.status(200).json(response);
  };

  public addTask = async (req: Request, res: Response): Promise<Response> => {
    const newTask = req.body;
    console.log(req.body);
    
    newTask.userId = res.locals.decoded.id;       
    const tasks = await this.taskService.addTask(newTask);
    return res.status(201).json(tasks);
  };

  public updateTask = async (req: Request, res: Response):Promise<Response> => {
    const  id  = req.params.id;
    const updatedTask = req.body;
    const response = await this.taskService.updateTask(Number(id), updatedTask);
    return res.status(200).json(response);
  };

  public deleteTask = async (req: Request,res: Response): Promise<Response> => {
    const { id } = res.locals.task;
    const response = await this.taskService.deleteTask(id);
    return res.status(204).json(response);
  };
}
