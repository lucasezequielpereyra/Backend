import logger from "../config/winston";
import User from "../models/user.model";

export const signUp = async (req, res) => {
  try {
    const { email, password, name, address, age, phone } = req.body;
    const file = req.file;
    const filePath = file.path;
    console.log(filePath);

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
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).render("login");
    }
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).render("login");
    }
    req.session.user = user;
    logger.info.info("User logged in");
    res.status(200).render("index");
  } catch (err) {
    logger.error.error(err);
    res.status(400).render("login");
  }
};
