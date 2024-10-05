import { Router } from 'express';
import { addThought, deleteThought, getAll, getOne } from '../../controllers/thoughtController.js';
import { addReaction } from '../../controllers/reactionController.js';
const router = Router();

router.post('/', addThought);
router.get('/:thoughtId', getOne);
router.get('/', getAll);
router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction)

export default router;
