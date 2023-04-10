import { Router } from 'express';
import { TalentsController } from '../http/controllers/TalentsController';
import { TalentsRepository } from '../repositories/TalentsRepository';
import { TalentsService } from '../services/TalentsService';

const talentsController = new TalentsController(new TalentsService(new TalentsRepository()));

const router = Router();

router.get('/talents', talentsController.index);
router.get('/talents/:id', talentsController.show);
router.post('/talents', talentsController.store);

export { router };