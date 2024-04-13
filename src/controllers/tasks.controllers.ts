import { Request, Response } from "express";
import { TasksServices } from "../services";

export class taskController {
  private taskService = new TasksServices();

  public getTaks = async (req: Request, res: Response):Promise<Response> => {
    const tasks = await this.taskService.getTasks(res.locals.filteredTasks);
    return res.status(200).json(tasks);
  };

  public getOneTask = async(req:Request, res:Response):Promise<Response> =>{
    const {task} = res.locals;  
    const response = await this.taskService.getOneTask(task);
    return res.status(200).json(response);
  };

  public addTask = async (req: Request, res: Response):Promise<Response>=>{      
    const tasks = await this.taskService.addTask(req.body);         
        return res.status(201).json(tasks);
  };

  public updateTask = async (req: Request, res:Response):Promise<Response>=>{
    const {task} = res.locals;
    const updatedTask = req.body;   
    
    const response = await this.taskService.updateTask(task, updatedTask);
    return res.status(200).json(response);
  };

  public deleteTask = async(req: Request, res: Response): Promise<Response> =>{
    const {id} = res.locals.task;
    const response = await this.taskService.deleteTask(id);
    return res.status(204).json(response);
  };
};
