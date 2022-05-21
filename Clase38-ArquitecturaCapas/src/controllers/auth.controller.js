import logger from "../config/winston";
import passport from "passport";
import * as mailService from "../services/mail.service";
import * as authService from "../services/auth.service";
import * as cartService from "../services/cart.service";

export const signUp = async (req, res) => {
  try {
    const { email, password, name, address, age, phone } = req.body;
    const user = { email, password, name, address, age, phone };
    const file = req.file;
    const filePath = file.path.substring(6, file.path.length);

    /*    SAVE USER      */
    authService.newUser(user, filePath);

    /*   SEND EMAIL TO ADM    */
    mailService.newUserEmail(user);

    logger.info.info("User created");
    res.status(201).render("index");
  } catch (err) {
    logger.error.error(err);
    res.status(400).render("register");
  }
};

export const signOut = async (req, res) => {
  try {
    // destroy cart
    if (req.session.cart) {
      await cartService.findByIdAndDelete(req.session.cart._id);
    }

    // destroy session
    req.session.destroy(() => {
      logger.info.info("User logged out");
      res.redirect("/");
    });
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};

export const succesredirect = async (req, res) => {
  try {
    let user = await authService.findOneById(req.session.passport.user);
    user.password = null;
    req.session.user = user;

    res.redirect("/dash");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};
