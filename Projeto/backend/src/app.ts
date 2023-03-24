import express from "express";
import cors from "cors";
import { videosRoutes } from "./routes/videos.routes";
import dotenv from 'dotenv'
import { userRoutes } from "./routes/user.routes";



export const app = express();
dotenv.config();
app.use(cors());
app.use(express.json())
app.use(express.static("videos"))
app.use(videosRoutes);
app.use(userRoutes);
