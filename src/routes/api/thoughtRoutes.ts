import { Router } from 'express';
import { getAll } from '../../controllers/thoughtController.js';
const router = Router();

router.get('/', getAll);

export default router;
