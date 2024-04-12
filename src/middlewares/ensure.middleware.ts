import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { prisma } from "../database/prisma";

class ensureMiddleware {
  private searchByCategoryName = async ({ category }: any) => {
    const foundCategory = await prisma.category.findFirst({
      where: { name: category },
      include: { tasks: true },
    });

    if (foundCategory) {
      return foundCategory;
    } else {
      return false;
    }
  };

  private searchByCategoryId = async (categoryId: number) => {
    const foundCategory = await prisma.task.findFirst({
      where: { categoryId: categoryId },
    });
    console.log(foundCategory);

    if (foundCategory) {
      return foundCategory;
    } else {
      return false;
    }
  };

  public bodyIsValid =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);

      return next();
    };

  public existCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let foundCategory: any;
    if (Object.keys(req.query).length != 0) {
      foundCategory = await this.searchByCategoryName(req.query);
    } else {
      if (req.body.categoryId == null) return next();
      foundCategory = await this.searchByCategoryId(req.body.categoryId);
    }

    if (foundCategory === false) {
      return res.status(404).json({ message: "Category not found" });
    } else {
      res.locals = foundCategory;
      return next();
    }
  };

  public existTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const task = await prisma.task.findFirst({ where: { id: Number(id) } });

    if (task) {
      res.locals.task = task;
      next();
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  };
}

export const ensure = new ensureMiddleware();
