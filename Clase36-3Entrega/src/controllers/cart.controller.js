import Cart from "../models/cart.model";
import logger from "../config/winston";
import productModel from "../models/product.model";
import * as mailService from "../services/mail.service";
import * as messageService from "../services/message.service";

export const newCart = async (req, res) => {
  try {
    const { user } = req.session;
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: user._id });
    const product = await Cart.findOne({
      user: user._id,
      products: productId,
    });
    if (cart) {
      if (product) {
        res.status(200).json({
          message: "Product already in cart",
        });
      } else {
        await Cart.findOneAndUpdate(
          { user: user._id },
          {
            $push: {
              products: productId,
            },
          },
          { new: true }
        );
        logger.info.info("Product added to cart");
        req.session.cart.products = [...req.session.cart.products, productId];
        res.status(200).redirect("/dash");
      }
    } else {
      const newCart = new Cart({
        user: user._id,
        products: productId,
      });
      await newCart.save();
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
  const cart = await Cart.findOne({ user: user._id });
  if (cart) {
    res.status(200).redirect("/cart/checkout");
  } else {
    logger.error.warn("Cart is empty");
    res.status(200).redirect("/");
  }
};

export const checkoutCart = async (req, res) => {
  const products = req.session.cart.products;
  const arrayProducts = await productModel.find({ _id: { $in: products } });

  res.render("checkout", { user: req.session.user, products: arrayProducts });
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ _id: req.session.cart?._id });
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
    await Cart.findOneAndDelete({ _id: req.session.cart?._id });
    req.session.cart = null;
    res.status(200).redirect("/");
  } catch (err) {
    logger.error.error(err);
    res.status(400).redirect("/");
  }
};

export const getCarts = async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json({
    carts,
  });
};
