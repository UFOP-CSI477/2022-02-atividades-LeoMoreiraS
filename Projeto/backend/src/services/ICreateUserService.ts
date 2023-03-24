import { User } from "@prisma/client";

export interface ICreateUserService {
  execute(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>):Promise<User>;
  }
  