const express = require('express')
const Container = require('../../Class/Container')
const path = require('path')

const configFile = path.join(__dirname, '../../DB/products.json')
const container = new Container(configFile)
const { Router } = express
const router = new Router()

router.get('/', async (req, res) => {
  const prods = await container.getAll()
  res.render('products', { productos: prods })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  res.json(await container.getById(id))
})

router.post('/add', async (req, res) => {
  await container.save(req.body)

  res.redirect('/')
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  const message = await container.editById(id, req.body)
  res.send(message)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const message = await container.deleteById(id)
  res.send(message)
})

module.exports = router
