const express = require('express')
import { register } from '../controllers/authController';
import { auth } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/signup', register);

// Protected routes
// router.get('/protected', auth, protectedController);

export default router;
