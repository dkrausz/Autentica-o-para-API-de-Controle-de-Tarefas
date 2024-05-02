import { injectable } from "tsyringe";
import { prisma } from "../database/prisma"
import { ICategoryService, TCategory, TCreateCategory } from "../interfaces";



@injectable()

export class CategoriesServices implements ICategoryService{

    getCategories = async ():Promise<Array<TCategory>>=>{
        return await prisma.category.findMany();
    }

    addCategory = async(newCategory:TCreateCategory):Promise<TCategory>=>{
        return await prisma.category.create({data:newCategory});
    }

    deleteCategory = async(id:number):Promise<void>=>{
         await prisma.category.delete({where : {id:Number(id)}});
    }
};