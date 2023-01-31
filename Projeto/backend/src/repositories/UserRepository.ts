import path from "path";
import fs from "fs";
import { ICreateUserService } from "./ICreateUserService";

export class UserRepository implements IUserRepository {
  private static instance: IUserRepository;

  private constructor() {}
  
  public static getInstance(): IUserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  find(user:string) {
    if (!user){
        return null;
    }



    return user;
    
  }
}
