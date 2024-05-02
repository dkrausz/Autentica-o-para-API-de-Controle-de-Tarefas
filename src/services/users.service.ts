
import { injectable } from "tsyringe";
import { IUserService, TCreateUser, TReturnUser, TUserLogin,TUserLoginReturn } from "../interfaces";
import { prisma } from "../database/prisma";
import { UserLoginReturnSchema, UserReturnSchema } from "../schemas";
import { compare, hash } from "bcrypt";
import {sign} from "jsonwebtoken";
import { AppError } from "../errors/AppError";

// Rota de cadastro de usuários.
// /users/login POST
// Rota de login de usuários.
// /users/profile GET
@injectable()

export class UserService implements IUserService{

    public addUser = async(newUser:TCreateUser):Promise<TReturnUser> =>{
       newUser.password=await hash(newUser.password, 10);
       const user = await prisma.user.create({data:newUser});
       return UserReturnSchema.parse(user);
    }

    public loginUser = async({email,password}:TUserLogin): Promise<TUserLoginReturn>=> {
        const secret = process.env.JWT_SECRET!;
        const expiresIn=process.env.JWT_EXPIRES_IN || "1h";
       
        const foundUser= await prisma.user.findFirst({where:{email:email}});
        if(!foundUser){
            throw new AppError("User not exists",404);
        }             
                
        const passwordMatch = await compare(password,foundUser.password);
             
        if(!passwordMatch){
            throw new AppError("Email and password doesn't match",401);
        }
                         
              
        const token = sign({id:foundUser.id, name: foundUser.name, email:foundUser.email},secret,{expiresIn: "24h"});             
                           
        const data ={accessToken:token, user:foundUser};
        
        return UserLoginReturnSchema.parse(data);
    }

    public retriveUser = async(id:number):Promise<TReturnUser>=>{
        const user = await prisma.user.findFirst({where:{id}});
        return UserReturnSchema.parse(user);
    }

}
