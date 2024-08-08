import express from 'express';
import { register } from '../controllers/authController';
import { auth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', register);

export default router;
