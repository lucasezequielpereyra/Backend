const express = require('express')
const products = require('./routes/products')
const handlebars = require('express-handlebars')
const path = require('path')

const rouetView = path.join(__dirname, '../views')
const PORT = 8080
const app = express()

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
  })
)

app.set('view engine', 'hbs') // register the template engine
app.set('views', rouetView) // specify the views directory

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', products)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(' Server run on port ' + PORT)
})
