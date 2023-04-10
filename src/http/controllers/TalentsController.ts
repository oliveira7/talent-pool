import { Request, Response } from 'express';
import { TalentAlreadyExists } from '../errors/TalentAlreadyExists';
import { ITalentsService } from '../../services/TalentsService';
import { z } from 'zod';
export class TalentsController {
  constructor(private talentsService: ITalentsService) {
    this.talentsService = talentsService;
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      //const talents = await this.talentsService.getTalents(10);
   
      return res.status(200).send('talents');
    } catch(err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {

      const params = await this.talentsService.getParams(req.body);
     
      await this.talentsService.create(params);
    } catch(err) {
      if(err instanceof TalentAlreadyExists) {
        return res.status(409).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    }

    return res.status(201).send({ message: 'Talent created successfully!'});

  }
}