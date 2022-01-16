// EXPRESS
const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT
// Class
const Container = require('./Class/Container')
// Container
const container = new Container('./products.json')

// Routes
app.get('/products', async (req, res) => {
  res.send(await container.getAll())
})

app.get('/randomProduct', async (req,res) => {
  res.send(await container.getRandomItem());
})


app.listen(PORT, () =>{ 
  console.log('Server run on port 8080')
})
