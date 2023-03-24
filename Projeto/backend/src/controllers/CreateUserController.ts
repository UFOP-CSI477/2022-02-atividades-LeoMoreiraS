import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController{

    async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const userRepository = new UserRepository();
      const createUserService = new CreateUserService(userRepository);
      const user = await createUserService.execute({name,email,password})
  
      return response.status(201).json(user);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error });
    }
  }
}