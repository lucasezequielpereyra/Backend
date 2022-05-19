import logger from "../config/winston";
import User from "../models/user.model";
import Cart from "../models/cart.model";
import * as mailService from "../services/mail.service";

export const signUp = async (req, res) => {
  try {
    const { email, password, name, address, age, phone } = req.body;
    const file = req.file;
    const filePath = file.path.substring(6, file.path.length);

    const user = new User({
      email: email,
      password: await User.encryptPassword(password),
      name: name,
      address: address,
      age: age,
      phone: phone,
      avatar: filePath,
    });

    await user.save();

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
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      logger.error.error("User not found");
      res.status(400).redirect("/");
      return;
    } else {
      const isPasswordValid = await User.comparePassword(
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
    await Cart.findOneAndDelete({ _id: req.session.cart?._id });
    req.session.destroy();
    logger.info.info("User logged out");
    res.status(200).redirect("/");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};
