import { Router } from 'express';
import { addThought, getAll, getOne } from '../../controllers/thoughtController.js';
const router = Router();

router.post('/', addThought);
router.get('/', getAll);
router.get('/:thoughtId', getOne);

export default router;
