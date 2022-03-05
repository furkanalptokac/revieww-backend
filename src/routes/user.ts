import { Router } from 'express';
import { signup } from '../controllers/UserController';

const router = Router();

router.post('/signup', signup);

export default router;
