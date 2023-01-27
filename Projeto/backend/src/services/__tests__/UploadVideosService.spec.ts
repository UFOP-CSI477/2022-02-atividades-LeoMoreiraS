import { UploadVideosService } from "../UploadVideosService";
import fs from "fs";
import path from "path";

describe("Upload Videos Service Test", () => {
  const uploadVideosService = UploadVideosService.getInstance();

  it("Should create only 1 instance of the service", () => {
    const uploadVideosService2 = UploadVideosService.getInstance();
    expect(uploadVideosService).toBe(uploadVideosService2);
  });

  it("Should not upload a video if it is not a .mp4", () => {
    const fakeFile: Express.Multer.File = {
      originalname: "InvalidFile.invalid",
    } as Express.Multer.File;

    try {
      uploadVideosService.execute(fakeFile, fakeFile);
      expect(true).toBeFalsy();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Invalid format passed to uploadVideos");
      } else {
        expect(true).toBeFalsy();
      }
    }
  });

  it("Should not upload a empty video", () => {
    let fakeFile: any = null;

    try {
      uploadVideosService.execute(fakeFile, fakeFile);
      expect(true).toBeFalsy();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Empty file passed to uploadVideos");
      } else {
        expect(true).toBeFalsy();
      }
    }
  });

  it("Should upload a valid video and thumbnail", () => {
    const testFilePath = path.resolve("test.mp4");
    const testThumbPath = path.resolve("test.jpg");
    fs.writeFileSync(testFilePath, "123");
    fs.writeFileSync(testThumbPath, "123");

    const fileVideo: Express.Multer.File = {
      path: testFilePath,
      originalname: "test.mp4",
    } as Express.Multer.File;

    const fileJpg: Express.Multer.File = {
      path: testThumbPath,
      originalname: "test.jpg",
    } as Express.Multer.File;

    const videoPath = path.resolve("videos", "test.mp4");
    const thumbPath = path.resolve("videos", "test.jpg");

    uploadVideosService.execute(fileVideo, fileJpg);
    expect(fs.existsSync(videoPath)).toBeTruthy();
    expect(fs.existsSync(thumbPath)).toBeTruthy();

    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
  });
});
