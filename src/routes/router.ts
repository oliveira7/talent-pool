import { Router } from 'express';
import TalentsController from '../http/controllers/TalentsController';

const router = Router();

router.get('/talents', TalentsController.index);
router.get('/talents/:id', TalentsController.show);
router.post('/talents', TalentsController.store);

export { router };