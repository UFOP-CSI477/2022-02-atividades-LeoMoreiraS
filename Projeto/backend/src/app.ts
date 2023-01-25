import express from "express";
import cors from "cors";
import { videosRoutes } from "./routes/videos.routes";

export const app = express();

app.use(cors());
app.use(express.static("videos"))
app.use(videosRoutes);
