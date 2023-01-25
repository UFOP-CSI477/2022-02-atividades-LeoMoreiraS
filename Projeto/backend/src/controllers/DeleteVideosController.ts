import { Request, Response } from "express";
import { DeleteVideosService } from "../services/DeleteVideosService";

export class DeleteVideosController {
  async handle(request: Request, response: Response) {

    const {filename} = request.params;
    
    const deleteVideosService = DeleteVideosService.getInstance();

    try{

        deleteVideosService.execute(filename);
    }catch(error){
        let message = 'Error'
        if(error instanceof  Error) message = error.message;
        return response.status(400).json(message);
    }

    return response.status(204).send();
  }
}
