import {z} from "zod";
import {UserCreateBodySchema, UserLoginReturnSchema, UserLoginSchema, UserReturnSchema} from "../schemas";

type TReturnUser = z.infer<typeof UserReturnSchema>;
type TCreateUser = z.infer<typeof UserCreateBodySchema>;
type TUserLogin = z.infer<typeof UserLoginSchema>;
type TUserLoginReturn = z.infer<typeof UserLoginReturnSchema>;


interface IUserService{
    retriveUser(id:number):Promise<TReturnUser>;
    addUser(newUser:TCreateUser):Promise<TReturnUser>;
    loginUser(loginResquest:TUserLogin):Promise<TUserLoginReturn>;
}

export {TReturnUser,TCreateUser, TUserLogin, IUserService,TUserLoginReturn };