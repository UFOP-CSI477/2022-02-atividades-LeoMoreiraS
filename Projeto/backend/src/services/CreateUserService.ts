import path from "path";
import fs from "fs";
import { ICreateUserService } from "./ICreateUserService";

export class CreateUserService implements ICreateUserService {
  private static instance: IUploadVideosService;

  private UserRepository: IUserRepository;

  private constructor(userRepository:IUserRepository) {
    this.UserRepository = userRepository;
  }
  
  public static getInstance(): ICreateUserService {
    if (!this.instance) {
      this.instance = new CreateUserService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(user:string, password:string) {
    if (!user||!password) {
      throw new Error("Missing Params!");
    }
    const userAlreadyExists = this.UserRepository.find(user);


    return user;
    
  }
}
