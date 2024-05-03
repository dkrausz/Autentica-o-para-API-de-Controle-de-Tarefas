import { Request, Response } from "express";
import { CategoriesServices } from "../services";
import { ICategoryService, TCreateCategory } from "../interfaces";
import {  inject, injectable } from "tsyringe";


@injectable()
export class CategoryController{

    constructor(@inject("CategoriesService") private categoriesServices:ICategoryService){}
  
    public getCategories = async(req:Request, res:Response):Promise<Response>=>{

        const response = await this.categoriesServices.getCategories();
        return res.status(200).json(response);
    }

    public addCategory = async(req: Request, res:Response):Promise<Response>=>{
        const {id} = res.locals.decoded;
        const newCategory = req.body;        
        
        newCategory.userId=id;
        const response = await this.categoriesServices.addCategory(newCategory);
               
        return res.status(201).json(response);
    }

    public deleteCategory = async(req: Request, res:Response):Promise<Response>=>{
        const categoryId = req.params.id;
        const userId = res.locals.decoded.id;
        const response = await this.categoriesServices.deleteCategory(Number(categoryId), userId);
        return res.status(204).json(response);
    }


}