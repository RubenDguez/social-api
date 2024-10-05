import { Router } from 'express';
import { addThought, deleteThought, getAll, getOne } from '../../controllers/thoughtController.js';
const router = Router();

router.post('/', addThought);
router.get('/:thoughtId', getOne);
router.get('/', getAll);
router.delete('/:thoughtId', deleteThought);

export default router;
