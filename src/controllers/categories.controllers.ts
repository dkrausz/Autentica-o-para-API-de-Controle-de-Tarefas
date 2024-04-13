import { Request, Response } from "express";
import { CategoriesServices } from "../services";
import { TCreateCategory } from "../interfaces";


export class categoryController{

    private categoriesServices = new CategoriesServices();

    public getCategories = async(req:Request, res:Response):Promise<Response>=>{

        const response = await this.categoriesServices.getCategories();
        return res.status(200).json(response);
    }

    public addCategory = async(req: Request, res:Response):Promise<Response>=>{
        const response = await this.categoriesServices.addCategory(req.body);
        return res.status(201).json(response);
    }

    public deleteCategory = async(req: Request, res:Response):Promise<Response>=>{
        const {id} = req.params;
       const response = await this.categoriesServices.deleteCategory(Number(id));
        return res.status(204).json(response);
    }


}