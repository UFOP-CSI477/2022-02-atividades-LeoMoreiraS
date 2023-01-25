export interface IUploadVideosService {
  execute(file: Express.Multer.File,thumb: Express.Multer.File): void;
}
