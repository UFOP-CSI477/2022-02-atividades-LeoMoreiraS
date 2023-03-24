import { UserRepository } from "../repositories/UserRepository";
import { User } from "@prisma/client";

export class GetUserService {

  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

}