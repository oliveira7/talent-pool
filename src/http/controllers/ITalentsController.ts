import { Request, Response } from 'express';

export interface ITalentsController {
  index: (req: Request, res: Response) => Promise<Response>;
  show: (req: Request, res: Response) => Promise<Response>;
  store: (req: Request, res: Response) => Promise<Response>;
}