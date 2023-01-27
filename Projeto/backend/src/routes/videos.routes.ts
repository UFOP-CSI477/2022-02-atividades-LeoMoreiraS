import { Router, Request, Response } from "express";
import path from "path";
import { JsonDB, Config } from "node-json-db";
import { GetVideosController } from "../controllers/GetVideosController";
import { StreamVideoController } from "../controllers/StreamVideoController";
import { videoStorage } from "../config/multer.config";
import { UploadVideosController } from "../controllers/UploadVideosController";
import { DeleteVideosController } from "../controllers/DeleteVideosController";

export const videosRoutes = Router();
const getVideosController = new GetVideosController();
const streamVideoController = new StreamVideoController();
const uploadVideosController = new UploadVideosController();
const deleteVideosController = new DeleteVideosController();

videosRoutes.get("/videos", getVideosController.handle);

videosRoutes.get("/video/:id", streamVideoController.handle);

videosRoutes.get(
  "/video-test/:id",
  async (request: Request, response: Response) => {
    const db = new JsonDB(new Config("myDataBase", true, false, "/"));

    interface FooBar {
      Hello: string;
      World: number;
    }
    const object = { Hello: "World", World: 5 } as FooBar;

    await db.push("/test", object);

    //Will be typed as FooBar in your IDE
    const result = await db.getObject<FooBar>("/test");

    console.log(result);

    response.sendFile("videos/video.mp4", { root: path.resolve() });
  }
);

videosRoutes.post(
  "/upload",
  videoStorage.fields([{name:"video",maxCount:1},{name:"jpeg",maxCount:1}]),
  uploadVideosController.handle
);

videosRoutes.delete("/delete/:filename", deleteVideosController.handle)