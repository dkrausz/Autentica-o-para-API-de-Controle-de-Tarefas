import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";


class EnsureUser{

    public isEmailExist = async(req:Request,res:Response,next:NextFunction)=>{
        const {email} = req.body;
        const foundEmail = await prisma.user.findFirst({where:{email:email}});
        if(!foundEmail){
            return next();
        }
        else{
            return res.status(409).json({ message: "This email is already registered" });
        }

    };

 

}

export const ensureUser = new EnsureUser(); 