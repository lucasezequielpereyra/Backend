import { Schema } from 'mongoose';
import MongoContainer from '../class/mongodb.container';
const now = Date;

class CartDao extends MongoContainer {
  constructor() {
    super('carts', {
      timestamps: {
        type: String,
        default: now(),
      },
      products: [
        {
          ref: 'products',
          type: Schema.Types.ObjectId,
        },
      ],
    });
  }

  async createCartDao() {
    try {
      await this.collection.create({});
    } catch (error) {
      return error;
    }
  }

  async deletePrductById(idCart, idProduct) {
    try {
      await this.collection.updateOne(
        { _id: idCart },
        { $pull: { products: idProduct } },
      );
    } catch (error) {
      return error;
    }
  }

  async updateCartDao(idCart, idProduct) {
    try {
      await this.collection.findOneAndUpdate(
        {
          _id: idCart,
        },
        {
          $addToSet: {
            products: idProduct,
          },
        },
      );
    } catch (error) {
      return error;
    }
  }
}

export default CartDao;
