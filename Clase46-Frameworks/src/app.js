import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import view from 'koa-views';
import session from 'koa-session';
import morgan from 'koa-morgan';
import cors from '@koa/cors';
import passport from 'koa-passport';
import path from 'path';
import authRouter from './routes/auth.routes';
import Productservice from './services/product.service';

const app = new Koa();

/*    MIDDLEWARES   */
app.use(morgan('combined'));
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(serve(path.join(__dirname, '../public')));

/*    TEMPLATE ENGINE     */
const viewPath = path.join(__dirname, '../views');
app.use(
  view(viewPath, {
    extension: 'ejs',
  }),
);

/*    KOA SESSION     */
app.keys = ['super-secret-key'];
app.use(session(app));

/*    PASSPORT     */
import './config/passport';
app.use(passport.initialize());
app.use(passport.session());

/*    Routes    */
app.use(authRouter.routes());
/* app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes); */

/*    Statics end points    */
app.use(async ctx => {
  if (ctx.url === '/') {
    await ctx.render('index');
  }
  if (ctx.url === '/auth/register') {
    await ctx.render('register');
  }
});

/* router.get('/dash', async ctx => {
  try {
    const products = await productService.findAll(); // products for dashboard
    const cart = ctx.req.session?.cart;

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
}); */

export default app;
