import { Router } from 'express';
import { TalentsController } from '../http/controllers/TalentsController';
import { TalentsService } from '../services/TalentsService';
import { TalentsRepository } from '../repositories/TalentsRepository';

const talentsController = new TalentsController(new TalentsService(new TalentsRepository()));

const router = Router();

router.get('/talents', talentsController.index.bind(talentsController));
router.post('/talents', talentsController.store.bind(talentsController));

export { router };