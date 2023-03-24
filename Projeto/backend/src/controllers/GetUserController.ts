import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { GetUserService } from "../services/GetUserService";

export class GetUserController {

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userRepository = new UserRepository();
      const getUserService = new GetUserService(userRepository);
      const user = await getUserService.getById(Number(id));

      return response.json(user);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error });
    }
  }

  async getByEmail(request: Request, response: Response) {
    try {
      const { email } = request.params;
      const userRepository = new UserRepository();
      const getUserService = new GetUserService(userRepository);
      const user = await getUserService.getByEmail(email);

      return response.json(user);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error });
    }
  }

}