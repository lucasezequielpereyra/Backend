import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

router.post('/add', CategoryController.newCategory);
router.get('/', CategoryController.getCategories);

export default router;
