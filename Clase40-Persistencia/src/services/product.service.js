import ProductModel from '../models/product.model';
import MongoClient from '../class/mongo.class';
import logger from '../config/winston';

class ProductService {
  constructor() {
    this.conn = new MongoClient();
    this.collection = ProductModel;
  }

  async findByProducts(products) {
    try {
      this.conn.connect();
      const data = await this.collection.find({ _id: { $in: products } });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async newProduct(product) {
    try {
      this.conn.connect();
      const data = await this.collection.create({
        name: product.name,
        price: product.price,
        category: product.category,
      });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findAll() {
    try {
      this.conn.connect();
      const data = await this.collection.find({});
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }
}

export default ProductService;
