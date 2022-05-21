import logger from "../config/winston";
import * as mailService from "../services/mail.service";
import * as messageService from "../services/message.service";
import * as cartService from "../services/cart.service";
import * as productService from "../services/product.service";

export const newCart = async (req, res) => {
  try {
    const { user } = req.session;
    const { productId } = req.body;
    const cart = await cartService.findByUser(user._id);
    const product = await cartService.findOneWithProduct(user._id, productId);
    if (cart) {
      if (product) {
        res.status(200).redirect("/dash");
      } else {
        await cartService.findOneAndUpdate(user._id, productId);

        logger.info.info("Product added to cart");
        req.session.cart.products = [...req.session.cart.products, productId];
        res.status(200).redirect("/dash");
      }
    } else {
      const newCart = await cartService.newCart(user._id, productId);

      req.session.cart = newCart;
      logger.info.info("New cart created");
      res.status(200).redirect("/dash");
    }
  } catch (err) {
    logger.error.error(err);
    res.status(400).json({
      message: "Error",
    });
  }
};

export const getCart = async (req, res) => {
  const { user } = req.session;
  const cart = await cartService.findByUser(user._id);
  if (cart) {
    res.status(200).redirect("/cart/checkout");
  } else {
    logger.error.warn("Cart is empty");
    res.status(200).redirect("/");
  }
};

export const checkoutCart = async (req, res) => {
  const products = req.session.cart.products;
  const arrayProducts = await productService.findByProducts(products);

  res.render("checkout", { user: req.session.user, products: arrayProducts });
};

export const deleteCart = async (req, res) => {
  try {
    await cartService.findByIdAndDelete(req.session.cart._id);
    res.status(200).redirect("/");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};

export const success = async (req, res) => {
  try {
    mailService.newBuyerEmail(req.session.user);
    messageService.sendWhatssap(req.session.user);
    await cartService.findByIdAndDelete(req.session.cart._id);
    req.session.cart = null;
    res.status(200).redirect("/");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};
