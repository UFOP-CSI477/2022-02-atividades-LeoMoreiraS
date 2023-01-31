export interface ICreateUserService {
    execute(user:string, password:string): Promise<string>;
  }
  