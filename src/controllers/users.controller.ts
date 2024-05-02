import { inject, injectable } from "tsyringe";
import { IUserService } from "../interfaces";
import { Request, Response } from "express";


@injectable()
export class UserController{

    constructor(@inject("UserService") private userService:IUserService){}

    public addUser=async(req: Request, res:Response):Promise<Response>=>{
        const user = await this.userService.addUser(req.body);
        return res.status(201).json(user);

    }

    public loginUser = async(req:Request, res: Response):Promise<Response>=>{       
        
        const login= await this.userService.loginUser(req.body);
        return res.status(200).json(login);
    }


    public retriveUser = async(req:Request, res:Response):Promise<Response>=>{
        const {id} = res.locals.decoded;
        const user = await this.userService.retriveUser(id);
        return res.status(200).json(user);

    }
}