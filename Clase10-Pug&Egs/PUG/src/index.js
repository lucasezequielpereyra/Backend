const express = require('express')
const products = require('./routes/products')
const path = require('path')

const rouetView = path.join(__dirname, '../views')
const PORT = 8080
const app = express()

app.set('view engine', 'pug')
app.set('views', rouetView)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', products)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(' Server run on port ' + PORT)
})
