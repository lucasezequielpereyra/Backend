import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ProductsMock from './mocks/products.mocks';
import AuthorsDao from './daos/authors.dao';
import MessagesDao from './daos/messages.dao';
import ProductsDao from './daos/products.dao';

// Routes
import loginRoutes from './routes/login.routes';

// Paths
const rouetView = path.join(__dirname, '../views');
const routeLayout = path.join(__dirname, '../views/layouts');
const routePublic = path.join(__dirname, '../public');

// Container Instance
const authorDao = new AuthorsDao();
const messageDao = new MessagesDao();
const productsDao = new ProductsDao();
const productsMock = new ProductsMock();

// Server
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://lucasezequiel:riverplate123@cluster0.qzap6.mongodb.net/clase24?retryWrites=true&w=majority',
    }),
    secret: 'secret_word',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  }),
);

// MdW
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const dataProducts = await productsDao.listAll();
  socket.emit('firstUpdate', dataProducts);

  const dataMsg = await messageDao.listMessages();
  socket.emit('firstUpdateMsg', dataMsg);

  // Add Product
  socket.on('newProduct', async data => {
    const { name, price } = data;
    await productsDao.createPorudctDao(name, price);

    const allPrd = await productsDao.listAll();
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
app.use(loginRoutes);

app.get('/api/products-test', (req, res) => {
  productsMock.popular();
  const prds = productsMock.listAll();
  res.render('products', { products: prds });
});

server.listen(port, () => {
  console.log('Server running on ' + port);
});
