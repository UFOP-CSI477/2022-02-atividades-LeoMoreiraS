import { GetVideosService } from "../GetVideosService";
import fs from 'fs';
import path from 'path';

describe('Get Videos Service Test', () => { 
    const getVideosService = GetVideosService.getInstance();

    it("Should create only 1 instance of the service", () => {
        const getVideosService2 = GetVideosService.getInstance();
        expect(getVideosService).toBe(getVideosService2);
    });

    it("Should return a video list",()=>{
        const testFilePath = path.resolve("videos", "test3.mp4");
        const testThumbPath = path.resolve("videos", "test3.jpg");
        fs.writeFileSync(testFilePath, "123");
        fs.writeFileSync(testThumbPath, "123");

        const videos = getVideosService.execute();
        const videoListed = videos.find(video => video.id === "test3.mp4");

        expect(videoListed).toBeTruthy();
        if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
        if (fs.existsSync(testThumbPath)) fs.unlinkSync(testThumbPath);
    });

 });