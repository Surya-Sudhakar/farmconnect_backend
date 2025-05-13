import express from 'express';
import {
  register,
  login,
  updateUser,
  getUserById,
  getMe,
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticate, getMe);             // ✅ PLACE THIS FIRST
router.get('/:id', authenticate, getUserById);      // 👈 MUST be below `/me`
router.put('/:id', authenticate, updateUser);

export default router;
