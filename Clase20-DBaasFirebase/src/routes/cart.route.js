import { Router } from 'express';
const router = Router();
import { CartDao, CartFirebaseDao } from '../daos/index';

const cartDao = new CartDao();
// const cartDao = new CartFirebaseDao();

router.get('/', async (req, res) => {
  res.status(200).json(await cartDao.listAll());
});

router.post('/', async (req, res) => {
  await cartDao.createCartDao();
  res.status(201).json('Created Cart');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await cartDao.deleteById(id);
  res.status(202).json('Deleted cart');
});

router.delete('/:idCart/:idProduct', async (req, res) => {
  const { idCart, idProduct } = req.params;
  await cartDao.deletePrductById(idCart, idProduct);
  res.status(202).json('Deleted product cart');
});

router.post('/', async (req, res) => {
  res.status(201).json('Created Cart');
});

router.put('/:idCart/:idProduct', async (req, res) => {
  const { idCart, idProduct } = req.params;
  await cartDao.updateCartDao(idCart, idProduct);
  res.status(202).json('Updated Cart');
});

export default router;
