import { PrismaClient, User } from "@prisma/client";

export interface IUserRepository{
    
 
 createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
     getUserById(id: number): Promise<User | null>;
     getUserByEmail(email: string): Promise<User | null>;
     updateUser(id: number, data: Partial<User>): Promise<User | null>;
     deleteUser(id: number): Promise<User | null>;
}