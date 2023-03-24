import { ICreateUserService } from "./ICreateUserService";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "@prisma/client";

export class CreateUserService implements ICreateUserService {
  private UserRepository: IUserRepository;

  constructor(userRepository:IUserRepository) {
    this.UserRepository = userRepository;
  }
  

  async execute(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>):Promise<User> {
    if (!user.email||!user.password||!user.name) {
      throw new Error("Missing Params!");
    }
    const userAlreadyExists = await this.UserRepository.getUserByEmail(user.email);
    if(userAlreadyExists){
        throw new Error("User already exists");
    }
    
    return this.UserRepository.createUser(user);
    
  }
}
