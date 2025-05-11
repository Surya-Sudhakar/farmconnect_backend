import express from 'express';
import { createOrder, getOrderById, getUserOrders } from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrderById);
router.get('/', authenticate, getUserOrders);

export default router;
