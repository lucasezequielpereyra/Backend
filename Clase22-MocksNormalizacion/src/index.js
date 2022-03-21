const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const Container = require('./Class/Container');
import ProductsMock from './mocks/products.mocks';
const productsMock = new ProductsMock();
import AuthorsDao from './daos/authors.dao';
import MessagesDao from './daos/messages.dao';
import mongoose from 'mongoose';

// Paths
const rouetView = path.join(__dirname, '../views');
const routeLayout = path.join(__dirname, '../views/layouts');
const routePublic = path.join(__dirname, '../public');

// Container Instance
const container = new Container();
const containerMsg = new Container();
const authorDao = new AuthorsDao();
const messageDao = new MessagesDao();

// Server
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// MdW
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HBS
app.set('views', rouetView);
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    layoutsDir: routeLayout,
    defaultLayout: 'main',
  }),
);

// Socket
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.static(routePublic));

// Socket Config
io.on('connection', async socket => {
  console.log('Cliente conectado');

  // First List Check
  const data = await container.getAll();
  socket.emit('firstUpdate', data);

  const dataMsg = await messageDao.listMessages();
  socket.emit('firstUpdateMsg', dataMsg);

  // Add Product
  socket.on('newProduct', async data => {
    await container.save(data);

    const allPrd = await container.getAll();
    io.sockets.emit('updateOk', allPrd); // Update table products
  });

  // Add Msg
  socket.on('newMsg', async data => {
    const { name, lastName, age, alias } = data[0];
    const { text } = data[1];

    const auth = await authorDao.createAuthorDao(name, lastName, age, alias);
    const id = auth._id;
    await messageDao.createMessageDao(id, text);

    const dataMsg = await messageDao.listMessages();

    io.sockets.emit('updateMsgOk', dataMsg);
  });
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/products-test', (req, res) => {
  productsMock.popular();
  const prds = productsMock.listAll();
  res.render('products', { products: prds });
});

server.listen(port, () => {
  console.log('Server running on ' + port);
});
