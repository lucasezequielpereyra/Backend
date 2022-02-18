const express = require('express');
const Container = require('../../Class/Container');
const Product = require('../../Class/Product');
const path = require('path');

const configFile = path.join(__dirname, '../../DB/products.json');
const container = new Container(configFile);
const { Router } = express;
const router = new Router();

let admin = true;

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(await container.getById(id));
});

router.post('/', async (req, res) => {
  if (admin) {
    const { name, description, code, url, price, stock } = req.body;
    const product = new Product(name, description, code, url, price, stock);

    res.json(await container.save(product));
  } else {
    res.json('Metodo disponible solo para administradores');
  }
});

router.put('/:id', async (req, res) => {
  if (admin) {
    const { id } = req.params;
    console.log(typeof id);
    const { name, description, code, url, price, stock } = req.body;
    const product = new Product(name, description, code, url, price, stock);

    res.send(await container.editById(id, product));
  } else {
    res.json('Metodo disponible solo para administradores');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(await container.deleteById(id));
});

module.exports = router;
