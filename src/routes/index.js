import { Router } from 'express';
import { router as userRouter } from './user/userRouter.js';

const router = Router();
router.use('/', userRouter);

export { router };
