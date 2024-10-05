import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

export default router;
