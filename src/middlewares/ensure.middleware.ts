import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { prisma } from "../database/prisma";

class ensureMiddleware {
  
  public bodyIsValid =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {           
      
      req.body = schema.parse(req.body);      
      return next();
    };


  public existCategoryById = async (req: Request, res: Response, next: NextFunction ) => {
    if (!req.body.categoryId) {
      return next();
    }
    const { categoryId } = req.body;
    const foundCategory = await prisma.category.findFirst({
      where: { id: categoryId },});

    if (foundCategory) {
     return next();
    } 
    else {
      return res.status(404).json({ message: "Category not found" });
    }
  };

  public existTask = async (req: Request,res: Response,next: NextFunction) => {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (task) {
      res.locals.task = task;  
     return next();
    } 
    else {            
      return res.status(404).json({ message: "Task not found" });
    }
  };

  public existCategoryByParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (foundCategory) {
     return next();
    } 
    else {
     
      return res.status(404).json({ message: "Category nor found" });
    }
  };
}

export const ensure = new ensureMiddleware();
