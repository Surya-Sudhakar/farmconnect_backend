import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../controllers/productController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, createProduct);
router.patch('/:id', authenticate, updateProduct);

export default router;
