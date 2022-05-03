import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cluster from 'cluster';
import { cpus } from 'os';
import { Strategy } from 'passport-facebook';
import compression from 'compression';
import logger from './winston';

import ProductsMock from './mocks/products.mocks';

// Routes
import authRoute from './routes/auth.routes';
import infoRoute from './routes/info.routes';
import randomRoute from './routes/random.routes';

// Paths
const rouetView = path.join(__dirname, '../views');
const routeLayout = path.join(__dirname, '../views/layouts');
const routePublic = path.join(__dirname, '../public');

// Container Instance
const productsMock = new ProductsMock();

// Server
const app = express();
import http from 'http';
const server = http.createServer(app);
const port = process.argv[2] || 4000;
const modoCluster = process.argv[3] == 'CLUSTER';
import { socket } from './socket';

// MdW
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(routePublic));

// Session
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

// Passport Config
const FacebookStrategy = Strategy;
const FACEBOOK_APP_ID = '1021784038762015';
const FACEBOOK_APP_SECRET = '22696df231280b712d70c624646fdfb6';
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `http://localhost:${port}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log(profile);
      cb(null, profile);
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Socket
const { Server } = require('socket.io');
const io = new Server(server);

// Socket Config
socket(io);

if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Número de procesadores: ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(
      'Worker',
      worker.process.pid,
      'died',
      new Date().toLocaleString(),
    );
    cluster.fork();
  });
} else {
  // Routes
  app.get('/', (req, res) => {
    logger.info.info('GET: se ha accedido a ' + req.url);
    res.render('index', {});
  });

  app.use('/auth', authRoute);
  app.use('/info', compression(), infoRoute);
  app.use('/random', randomRoute);

  app.get('/api/products-test', (req, res) => {
    logger.info.info('GET: se ha accedido a ' + req.url);
    productsMock.popular();
    const prds = productsMock.listAll();
    res.render('products', { products: prds });
  });

  app.get('*', (req, res) => {
    logger.warn.warn('ERROR: se ha accedido a ' + req.url);
  });

  app.listen(port, err => {
    if (!err)
      logger.info.info(
        `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`,
      );
  });
}
