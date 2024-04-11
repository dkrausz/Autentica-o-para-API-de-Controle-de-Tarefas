import { Request, Response } from "express";
import { TasksServices } from "../services";

export class taskController {
  private taskService = new TasksServices();

  public getTaks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getTaks();
    return res.status(200).json(tasks);
  };
}
