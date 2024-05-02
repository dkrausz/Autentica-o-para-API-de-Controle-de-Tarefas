import {z} from "zod"

 const UserSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1)    
});


const UserCreateBodySchema = UserSchema.omit({id:true});
const UserReturnSchema = UserSchema.omit({password:true});
const UserLoginSchema = UserSchema.pick({email:true,password:true});


const UserLoginReturnSchema = z.object({
    accessToken: z.string()
}).extend({user:UserReturnSchema});

export{UserSchema,UserCreateBodySchema,UserReturnSchema,UserLoginSchema,UserLoginReturnSchema};
