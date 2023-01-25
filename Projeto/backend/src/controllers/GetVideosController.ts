import { Request, Response } from "express";
import { GetVideosService } from "../services/GetVideosService";

export class GetVideosController {
  async handle(request: Request, response: Response) {
    const getVideosService = GetVideosService.getInstance();

    const videos = getVideosService.execute();

    return response.status(200).json(videos);
  }
}
