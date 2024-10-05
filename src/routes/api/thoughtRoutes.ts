import { Router } from 'express';
import { addReaction, removeReaction } from '../../controllers/reactionController.js';
import { addThought, deleteThought, getAll, getOne } from '../../controllers/thoughtController.js';

const router = Router();

router.post('/', addThought);
router.get('/:thoughtId', getOne);
router.get('/', getAll);
router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
