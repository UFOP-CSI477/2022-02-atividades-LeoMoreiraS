import { Request, Response } from "express";

export interface IStreamVideoService {
  execute(request: Request, response: Response): void;
}
