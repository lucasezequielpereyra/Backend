import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

const router = Router();

router.get('/buy', CartController.getCart);
router.post('/add', CartController.newCart);
router.get('/checkout', CartController.checkoutCart);
router.get('/delete', CartController.deleteCart);
router.post('/succes', CartController.success);

export default router;
