import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

class AuthMiddleware{

    public isAuth = async(req:Request, res:Response,next:NextFunction)=>{
        const {authorization} = req.headers;                    
   
        if(!authorization){
            throw new AppError( "Token is required" ,401);
        }

        const[_,token] = authorization.split(" ");
        const secret = process.env.JWT_SECRET!;

        const jwtPayload = verify(token,secret);
        
        res.locals = {...res.locals, decoded:jwtPayload};
        
    return next();
    }

   

}

export const authMiddleware = new AuthMiddleware();