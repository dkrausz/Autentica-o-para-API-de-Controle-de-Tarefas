import { Router } from "express";
import { container } from "tsyringe";
import { authMiddleware, ensure, ensureUser } from "../middlewares";
import { UserCreateBodySchema, UserLoginSchema, UserSchema } from "../schemas";
import { UserController } from "../controllers";
import { UserService } from "../services";

export const userRoute = Router();
container.registerSingleton("UserService", UserService);

const userController = container.resolve(UserController);

userRoute.post("/", ensure.bodyIsValid(UserCreateBodySchema), ensureUser.isEmailExist, userController.addUser);
userRoute.post("/login", ensure.bodyIsValid(UserLoginSchema), userController.loginUser);
userRoute.get("/profile", authMiddleware.isAuth, userController.retriveUser);
