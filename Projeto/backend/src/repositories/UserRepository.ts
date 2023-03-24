import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient()

  }


 async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return this.prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

 async  getUserById(id: number): Promise<User | null> {
  return this.prisma.user.findUnique({
    where: { id },
  });
}

 async  getUserByEmail(email: string): Promise<User | null> {
  return this.prisma.user.findUnique({
    where: { email },
  });
}

 async  updateUser(id: number, data: Partial<User>): Promise<User | null> {
  return this.prisma.user.update({
    where: { id },
    data,
  });
}

 async deleteUser(id: number): Promise<User | null> {
  return this.prisma.user.delete({
    where: { id },
  });
}
}
