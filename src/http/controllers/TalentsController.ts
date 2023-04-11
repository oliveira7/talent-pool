import { Request, Response } from 'express';
import { TalentAlreadyExists } from '../errors/TalentAlreadyExists';
import { ITalentsService } from '../../services/TalentsService';
import { z, ZodError } from 'zod';

export class TalentsController {
  constructor(private talentsService: ITalentsService) {
    this.talentsService = talentsService;
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const talents = await this.talentsService.index(req.query);
  
      return res.status(200).send({data: talents});
    } catch(err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const talentSchema = z.object({
        position: z.enum(['fullstack', 'frontend', 'backend']),
        salary: z.number(),
        yearsExperience: z.number(),
        technologies: z.array(z.string()),
        region: z.string(),
        availability: z.enum(['fulltime', 'parttime', 'freelance']),
        name: z.string(),
        email: z.string().email(),
        education: z.string(),
        languages: z.array(z.string()),
        contact: z.string().regex(/^(\d{2})(\d{2})9(\d{4})(\d{4})$/),
        occupation: z.string()
      });

      talentSchema.safeParse(req.body);
      const params = this.talentsService.getParams(req.body);

      await this.talentsService.create(params);
      
      return res.status(201).send({ message: 'Talent created successfully!'});
    } catch(err) {
      if(err instanceof TalentAlreadyExists) {
        return res.status(409).send({ message: err.message });
      }
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation error.',
          error: err.format()
        });
      }
      return res.status(500).send({ error: err.message });
    }
  }
}