import CartModel from '../models/cart.model';
import MongoClient from '../class/mongo.class';
import logger from '../config/winston';

class CartService {
  constructor() {
    this.conn = new MongoClient();
    this.collection = CartModel;
  }

  async findCartByUser(user) {
    try {
      this.conn.connect();
      const data = await this.collection.findOne({ user: user });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findOneWithProduct(userId, productId) {
    try {
      this.conn.connect();
      const data = await this.collection.findOne({
        user: userId,
        products: productId,
      });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findOneAndUpdate(userId, productId) {
    try {
      this.conn.connect();
      const data = await this.collection.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            products: productId,
          },
        },
        { new: true },
      );
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findOneAndRemove(cartId) {
    try {
      this.conn.connect();
      const data = await this.collection.findOneAndRemove({
        _id: cartId,
      });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async newCart(userId, productId) {
    try {
      this.conn.connect();
      const cartModel = new CartModel({
        user: userId,
        products: productId,
      });
      return cartModel.save();
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }
}

export default CartService;
