import { Request, Response, Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

router.use((_req: Request, res: Response) => {
  return res.send('Wrong route!');
});

export default router;
