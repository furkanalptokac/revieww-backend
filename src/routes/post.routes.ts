import { Router } from 'express';
import { createPost } from '../controllers';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/', verifyToken, createPost);

export default router;
