import path from "path";
import fs from "fs";
import { IUploadVideosService } from "./IUploadVideosService";

export class UploadVideosService implements IUploadVideosService {
  private static instance: IUploadVideosService;

  private constructor() {}
  
  public static getInstance(): IUploadVideosService {
    if (!this.instance) {
      this.instance = new UploadVideosService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(file: Express.Multer.File,thumb: Express.Multer.File) {
    if (!file||!thumb) {
      throw new Error("Empty file passed to uploadVideos");
    }

    if (path.extname(file.originalname) !== ".mp4") {
      throw new Error("Invalid format passed to uploadVideos");
    }
    const filepath = path.resolve("videos", file.originalname.replace(" ", "_"));
    const thumbpath = path.resolve("videos", file.originalname.replace(" ", "_").replace(".mp4",".jpg"));
    fs.renameSync(file.path, filepath);
    fs.renameSync(thumb.path,thumbpath);

    
  }
}
