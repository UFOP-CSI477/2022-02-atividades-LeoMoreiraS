import { IGetVideosService, Video } from "./IGetVideosService";
import path from "path";
import fs from "fs";

export class GetVideosService implements IGetVideosService {
  private static instance: IGetVideosService;

  private constructor() {}

  public static getInstance(): IGetVideosService {
    if (!this.instance) {
      this.instance = new GetVideosService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(): Video[] {
    let videos = fs.readdirSync(path.resolve("videos"));
    videos.shift();

    videos = videos.filter((video) => {
      if (path.extname(video) === ".mp4") return video;
    });

    const response: Video[] = [];

    videos.forEach((video) => {
      response.push({
        id: video,
        title: video.replace(".mp4", "").replace(/_/g, " "),
        image: video.replace(".mp4", ".jpg"),
      });
    });

    return response;
  }
}
