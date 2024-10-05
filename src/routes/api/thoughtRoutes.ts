import { Router } from 'express';
import { addThought, getAll, getOne } from '../../controllers/thoughtController.js';
const router = Router();

router.post('/', addThought);
router.get('/:thoughtId', getOne);
router.get('/', getAll);

export default router;
