import logger from "../config/winston";
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findOnebyEmail(email);

    if (!user) {
      logger.error.error("User not found");
      res.status(400).redirect("/");
      return;
    } else {
      const isPasswordValid = await authService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        logger.error.error("Password is not valid");
        res.status(400).redirect("/");
        return;
      }
    }

    req.session.user = user;
    logger.info.info("User logged in");
    res.status(200).redirect("/dash");
  } catch (err) {
    logger.error.error(err);
    res.status(400).render("index");
  }
};

export const logout = async (req, res) => {
  try {
    // destroy cart
    if (req.session.cart) {
      await cartService.findByIdAndDelete(req.session.cart._id);
    }

    req.session.destroy();
    logger.info.info("User logged out");
    res.status(200).redirect("/");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};
