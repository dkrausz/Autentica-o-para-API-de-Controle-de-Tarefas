import { injectable } from "tsyringe";
import { prisma } from "../database/prisma"
import { ICategoryService, TCategory, TCategoryReturnBody, TCreateCategory } from "../interfaces";
import { AppError } from "../errors/AppError";
import { CategoriesReturnSchema, CategoriesSchema } from "../schemas";



@injectable()

export class CategoriesServices implements ICategoryService{

    isOwner=async(userId:number,categoryId:number):Promise<void>=>{       
        const owner= await prisma.category.findFirst({where:{id:categoryId,userId:userId}});                   
         if(owner==null){           
           throw new AppError("This user is not the task owner", 403);
        }
       
    }

    getCategories = async ():Promise<Array<TCategory>>=>{
        const categories = await prisma.category.findMany();
        return CategoriesSchema.array().parse(categories);
    }

    addCategory = async(newCategory:TCreateCategory):Promise<TCategoryReturnBody>=>{       
        
        const category= await prisma.category.create({data:newCategory});        
        
         return CategoriesReturnSchema.parse(category);      
    }

    deleteCategory = async(caregoryId:number,userid:number):Promise<void>=>{
       await this.isOwner(userid,caregoryId);
         await prisma.category.delete({where : {id:Number(caregoryId)}});
    }
};