import express from 'express';
import { register, login,updateUser,getUserById } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:id', authenticate, updateUser);
router.get('/:id', authenticate, getUserById);


export default router;
