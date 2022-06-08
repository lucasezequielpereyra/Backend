import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import logger from './config/winston';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import Productservice from './services/product.service';

const productService = new Productservice();
const app = express();

/*    MIDDLEWARES   */
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

/*    TEMPLATE ENGINE     */
const viewPath = path.join(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewPath);

/*    SESSION     */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_CONNECT,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
/*    PASSPORT     */
import './config/passport';
app.use(passport.initialize());
app.use(passport.session());

/*    Statics end points    */
app.get('/', (req, res) => {
  req.isAuthenticated() ? res.redirect('/dash') : res.render('index');
});

app.get('/dash', async (req, res) => {
  try {
    const products = await productService.findAll(); // products for dashboard
    const cart = req.session?.cart;

    if (req.session?.user) {
      req.isAuthenticated()
        ? res.render('dash-products', {
            user: req.session.user,
            products: products,
            cart: cart,
          })
        : res.redirect('/');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    logger.error.error(err);
    res.status(500).redirect('/');
  }
});

/*    Routes    */
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

/*    404 not found route     */
app.get('*', (req, res) => {
  logger.warn.warn(`${req.method} ${req.url} url not found`);
  res.send('404');
});

export default app;
