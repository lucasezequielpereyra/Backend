import User from '../class/user.class';
import AuthService from '../services/auth.service';
import CartService from '../services/cart.service';
import * as MailService from '../services/mail.service';
import logger from '../config/winston';

let cartService = null;
let authService = null;

switch (process.env.PERSISTANCE) {
  case 'MONGO':
    cartService = new CartService();
    authService = new AuthService();
    break;
  case 'MYSQL':
    productService = null; // implement mysql
  default:
    break;
}

export const AuthController = {
  async signUp(ctx) {
    const { email, password, name, address, age, phone } = ctx.request.body;
    const user = { email, password, name, address, age, phone };

    try {
      const userModel = new User(
        user.email,
        user.password,
        user.name,
        user.address,
        user.age,
        user.phone,
      );

      await authService.newUser(userModel);

      await MailService.newUserEmail(userModel);

      logger.info.info('User created');
      ctx.status = 201;
      await ctx.render('index');
    } catch (err) {
      logger.error.error(err);
      ctx.status = 500;
      await ctx.render('register');
    }
  },

  async signOut(req, res) {
    try {
      // destroy cart
      if (req.session.cart) {
        await cartService.findOneAndRemove(req.session.cart._id);
      }

      // destroy session
      req.session.destroy(() => {
        logger.info.info('User logged out');
        res.redirect('/');
      });
    } catch (err) {
      logger.error.error(err);
      res.status(500).redirect('/');
    }
  },

  async succesredirect(req, res) {
    try {
      let user = await authService.findUserById(req.session.passport.user);
      user.password = null;
      req.session.user = user;

      res.status(200).redirect('/dash');
    } catch (err) {
      logger.error.error(err);
      res.status(400).redirect('/');
    }
  },
};
