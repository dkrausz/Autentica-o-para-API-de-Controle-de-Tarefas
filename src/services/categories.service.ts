import { prisma } from "../database/prisma"
import { TCategory } from "../interfaces";

export class CategoriesServices{

    getTasks = async ():Promise<Array<TCategory>>=>{
        return await prisma.category.findMany();
    }

};