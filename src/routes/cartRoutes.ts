import express from 'express';
import {
  addToCart,
  getCart,
  removeFromCart,
  checkoutCart
} from '../controllers/cartController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:id', removeFromCart);
router.post('/checkout', checkoutCart);

export default router;
