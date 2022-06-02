import Cart from '../class/cart.class';
import logger from '../config/winston';
import * as MailService from '../services/mail.service';
import * as MessageSerbice from '../services/message.service';
import CartService from '../services/cart.service';
const cartService = new CartService();
import ProductService from '../services/product.service';

let productService = null;

switch (process.env.PERSISTANCE) {
  case 'MONGO':
    productService = new ProductService();
    break;
  case 'MYSQL':
    productService = null; // implement mysql
  default:
    break;
}

export const CartController = {
  async newCart(req, res) {
    try {
      const { user } = req.session;
      const { productId } = req.body;
      const cart = await cartService.findCartByUser(user._id);
      const product = await cartService.findOneWithProduct(user._id, productId);
      console.log(product);

      if (cart) {
        if (product) {
          res.status(200).redirect('/dash');
        } else {
          await cartService.findOneAndUpdate(user._id, productId);

          logger.info.info('Product added to cart');
          req.session.cart.products = [...req.session.cart.products, productId];
          res.status(200).redirect('/dash');
        }
      } else {
        const newCart = await cartService.newCart(user._id, productId);
        req.session.cart = newCart;
        logger.info.info('New cart created');
        res.status(200).redirect('/dash');
      }
    } catch (err) {
      logger.error.error(err);
      res.status(500).redirect('/');
    }
  },

  async getCart(req, res) {
    try {
      const { user } = req.session;
      const cartObj = new Cart(await cartService.findCartByUser(user._id));

      if (cartObj) {
        res.status(200).redirect('/cart/checkout');
      } else {
        logger.error.warn('Cart is empty');
        res.status(200).redirect('/');
      }
    } catch (err) {
      logger.error.error(err);
      res.status(500).redirect('/');
    }
  },

  async checkoutCart(req, res) {
    const products = req.session.cart?.products;
    const arrayProducts = await productService.findByProducts(products);

    res.render('checkout', { user: req.session.user, products: arrayProducts });
  },

  async deleteCart(req, res) {
    try {
      await cartService.findOneAndRemove(req.session.cart._id);
      req.session.cart = null;
      res.status(200).redirect('/');
    } catch (err) {
      logger.error.error(err);
      res.status(500).redirect('/');
    }
  },

  async success(req, res) {
    try {
      MailService.newBuyerEmail(req.session.user);
      MessageSerbice.sendWhatssap(req.session.user);

      await cartService.findOneAndRemove(req.session.cart._id);

      req.session.cart = null;
      res.status(200).redirect('/');
    } catch (err) {
      logger.error.error(err);
      res.status(500).redirect('/');
    }
  },
};
