import { Request, Response } from "express";
import { UploadVideosService } from "../services/UploadVideosService";


export class UploadVideosController {
  async handle(request: Request, response: Response) {
    const files: any = request.files;
    const file = files.video[0];
    const thumb = files.jpeg[0];
    const id = request.body;
    
    const uploadVideosService = new UploadVideosService();

    try {
      if (!file || !thumb) {
        throw new Error("No such file!");
      }

      const video = await uploadVideosService.execute(file, thumb, id);

      return response.status(201).json(video);
    } catch (error) {
      console.error(error);
      let message = "Error";
      if (error instanceof Error) message = error.message;
      return response.status(400).json({ message });
    }
  }
}