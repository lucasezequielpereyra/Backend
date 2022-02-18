const express = require('express');
const ContainerCart = require('../../Class/ContainerCart');
const ContainerPrd = require('../../Class/Container');
const Cart = require('../../Class/Cart');
const path = require('path');

const configFile = path.join(__dirname, '../../DB/carts.json');
const configFilePrd = path.join(__dirname, '../../DB/products.json');

const containerCart = new ContainerCart(configFile);
const containerPrd = new ContainerPrd(configFilePrd);

const { Router } = express;
const router = new Router();

let admin = true;

router.post('/', async (req, res) => {
  if (admin) {
    const cart = new Cart();

    res.json(await containerCart.save(cart));
  } else {
    res.json('Metodo disponible solo para administradores');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(await containerCart.deleteById(id));
});

router.get('/:id/products', async (req, res) => {
  const { id } = req.params;

  res.json(await containerCart.getAllProducts(id));
});

router.post('/:idCart/:idPrd', async (req, res) => {
  const { idPrd, idCart } = req.params;
  const prd = await containerPrd.getById(idPrd);

  res.json(await containerCart.addProductCart(idCart, prd));
});

router.delete('/:idCart/products/:idPrd', async (req, res) => {
  const { idCart, idPrd } = req.params;

  res.json(await containerCart.deleteProductByCart(idCart, idPrd));
});

module.exports = router;
