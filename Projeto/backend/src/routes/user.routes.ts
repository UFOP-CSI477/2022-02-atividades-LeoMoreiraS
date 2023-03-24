import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { GetUserController } from "../controllers/GetUserController";

import { UserLoginController } from "../controllers/UserLoginController";


export const userRoutes = Router();

const userLoginController = new UserLoginController();
const createUserController = new CreateUserController();
const getUserController = new GetUserController();

userRoutes.post("/login", userLoginController.handle);
userRoutes.post("/user", createUserController.handle);

userRoutes.get("/users/:id", getUserController.getById);
userRoutes.get("/users/email/:email", getUserController.getByEmail);

