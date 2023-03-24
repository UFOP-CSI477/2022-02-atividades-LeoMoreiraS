import { Router } from "express";

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

videosRoutes.post(
  "/upload",
  videoStorage.fields([{name:"video",maxCount:1},{name:"jpeg",maxCount:1}]),
  uploadVideosController.handle
);

videosRoutes.delete("/delete/:filename", deleteVideosController.handle)