export interface Video {
  id: string;
  title: string;
  image: string;
}

export interface IGetVideosService {
  execute(): Video[];
}
