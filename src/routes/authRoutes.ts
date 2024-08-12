import express from 'express';
import { register } from '../controllers/signupController';
import { signin } from '../controllers/signincontroller';
import { auth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', register);
router.post('/signin', signin); // Add route for signin

export default router;
