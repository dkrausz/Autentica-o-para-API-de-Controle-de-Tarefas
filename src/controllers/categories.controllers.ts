import { Request, Response } from "express";
import { CategoriesServices } from "../services";


export class categoryController{

    private categoriesServices = new CategoriesServices();

    public getCategories = async(req:Request, res:Response):Promise<Response>=>{

        const categories = await this.categoriesServices.getTasks();
        return res.status(200).json(categories);
    }


}