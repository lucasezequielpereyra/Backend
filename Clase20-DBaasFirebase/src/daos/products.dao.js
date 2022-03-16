import MongoContainer from '../class/mongodb.container';

class ProductsDao extends MongoContainer {
  constructor() {
    super('products', {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        reqired: true,
      },
      img: {
        type: String,
        default:
          'https://img.favpng.com/5/19/25/shopping-cart-icon-product-return-png-favpng-1ZJU3szBCWCr5YYXDXtgqG4ja.jpg',
      },
    });
  }

  async createProductDao(name, price) {
    try {
      await this.collection.create({
        name: name,
        price: price,
      });
    } catch (error) {
      return error;
    }
  }

  async updateProductDao(id, name, price, img) {
    try {
      await this.collection.findOneAndUpdate(
        { _id: id },
        { name: name, price: price },
      );
    } catch (error) {}
  }
}

export default ProductsDao;
