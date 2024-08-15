import express from 'express';
import { auth, authorizeRole } from '../middleware/authMiddleware';
import { authController } from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/signup', authController.register);
router.post('/signin', authController.signin);

// Protected routes
router.put('/update/:id', auth, authorizeRole(['admin', 'user']), authController.updateUser);
router.delete('/delete/:id', auth, authorizeRole(['admin']), authController.deleteUser);

export default router;
