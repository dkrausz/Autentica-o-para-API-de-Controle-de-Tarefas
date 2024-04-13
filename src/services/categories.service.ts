import { prisma } from "../database/prisma"
import { TCategory, TCreateCategory } from "../interfaces";

export class CategoriesServices{

    getCategories = async ():Promise<Array<TCategory>>=>{
        return await prisma.category.findMany();
    }

    addCategory = async(newCategory:TCreateCategory):Promise<TCategory>=>{
        return await prisma.category.create({data:newCategory});
    }

    deleteCategory = async(id:Number)=>{
        return await prisma.category.delete({where : {id:Number(id)}});
    }
};