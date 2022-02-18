const express = require('express');
const app = express();
const productRouter = require('./routes/products');
const cartRouter = require('./routes/carts');

// Server
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// MdW
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use((req, res) => {
  res.status(404);
  res.send({
    error: -2,
    descripcion: `Route ${req.originalUrl} method ${req.method} not yet`,
  });
});

server.listen(port, () => {
  console.log('Server running on ' + port);
});
server.on('error', error => console.log(` Error on server ${error}`));
