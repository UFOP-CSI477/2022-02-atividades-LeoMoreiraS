import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserLoginController {
    async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  
    return response.json({ token });
  }
}