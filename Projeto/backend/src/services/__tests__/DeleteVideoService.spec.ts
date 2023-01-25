import { DeleteVideosService } from "../DeleteVideosService";
import fs from "fs";
import path from "path";

describe("Delete Videos Service Test", () => {
  const deleteVideosService = DeleteVideosService.getInstance();

  it("Should create only 1 instance of the service", () => {
    const deleteVideosService2 = DeleteVideosService.getInstance();
    expect(deleteVideosService).toBe(deleteVideosService2);
  });

  it("Should not try to delete a file that does not exist", () => {
    try {
      deleteVideosService.execute("invalidFile.file");
      expect(true).toBeFalsy();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("No such file");
      } else {
        expect(true).toBeFalsy();
      }
    }
  });

  it("Should delete a valid video and thumbnail", () => {
    const testFilePath = path.resolve("videos", "test1.mp4");
    const testThumbPath = path.resolve("videos", "test1.jpg");
    fs.writeFileSync(testFilePath, "123");
    fs.writeFileSync(testThumbPath, "123");

    const videoPath = path.resolve("videos", "test1.mp4");
    const thumbPath = path.resolve("videos", "test1.jpg");

    deleteVideosService.execute("test1.mp4");
    expect(fs.existsSync(videoPath)).toBeFalsy();
    expect(fs.existsSync(thumbPath)).toBeFalsy();
  });
});
