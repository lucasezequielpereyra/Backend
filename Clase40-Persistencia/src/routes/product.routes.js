import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.post('/add', ProductController.newProduct);
router.get('/', ProductController.getProducts);

export default router;
