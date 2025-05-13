import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../controllers/productController';
import { authenticate } from '../middlewares/authMiddleware';
import { restrictTo } from '../middlewares/restrictTo'; // ✅ import role middleware

const router = express.Router();

// ✅ Public endpoints
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// ✅ Farmer-only endpoints
router.post('/', authenticate, restrictTo('farmer'), createProduct);
router.patch('/:id', authenticate, restrictTo('farmer'), updateProduct);

export default router;
