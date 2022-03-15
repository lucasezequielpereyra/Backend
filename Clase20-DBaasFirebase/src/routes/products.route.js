import { Router } from 'express';
const router = Router();
import { ProductsDao, ProductFirebaseDao } from '../daos/index';

const productDao = new ProductFirebaseDao();
// coonst productDao = new ProductDao();

router.get('/', async (req, res) => {
  res.status(200).json(await productDao.listAll());
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const prd = await productDao.createProductDao(name, price);
  res.status(201).json(prd);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await productDao.deleteById(id);
  res.status(202).json('Delete product');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  await productDao.updateProductDao(id, name, price);
  res.status(202).json('Updated product');
});

export default router;
