import path from "path";
import fs from "fs";
import { IUploadVideosService } from "./IUploadVideosService";
import { PrismaClient } from "@prisma/client";

export class UploadVideosService implements IUploadVideosService {
  
  async execute(file: Express.Multer.File, thumb: Express.Multer.File, userId: number):Promise<any> {
    if (!file || !thumb) {
      throw new Error("Empty file passed to uploadVideos");
    }
  
    if (path.extname(file.originalname) !== ".mp4") {
      throw new Error("Invalid format passed to uploadVideos");
    }
  
    const videoName = file.originalname.replace(" ", "_");
    const videoPath = path.resolve("videos", videoName);
    const thumbName = videoName.replace(".mp4", ".jpg");
    const thumbPath = path.resolve("videos", thumbName);
    fs.renameSync(file.path, videoPath);
    fs.renameSync(thumb.path, thumbPath);
    const prisma = new PrismaClient();
    const video = await prisma.video.create({
      data:{
        name: videoName,
        thumbnail: thumbPath,
        url: videoPath,
        user: { connect: { id: userId } },
      },
      }
    );
    
    return video;
  }
}
