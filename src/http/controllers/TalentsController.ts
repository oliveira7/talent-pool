import { Request, Response } from 'express';
import { TalentAlreadyExists } from '../errors/TalentAlreadyExists';
import { TalentsService } from '../../services/TalentsService';
import { ITalentsController } from './ITalentsController';

export class TalentsController implements ITalentsController{
  constructor(private talentsService: TalentsService){
    talentsService = this.talentsService;
  }

  async index(req: Request, res: Response) {
    res.send('Hello World!');
  }

  async show(req: Request, res: Response) {
    res.send('Hello World!');
  }

  async store(req: Request, res: Response) {
    try {
      const params = await this.talentsService.getParams(req.body);

      await this.talentsService.registerTalent(params);
    }catch(err) {
      if(err instanceof TalentAlreadyExists) {
        return res.status(409).send({ error: err.message });
      }
    }

    return res.status(201).send();
  }
}