import { Request, Response } from "express";
import { StreamVideoService } from "../services/StreamVideoService";

export class StreamVideoController {
  async handle(request: Request, response: Response) {
    const streamVideoService = StreamVideoService.getInstance();

    streamVideoService.execute(request, response);
  }
}
