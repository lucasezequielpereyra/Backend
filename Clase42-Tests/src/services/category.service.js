import CategoryModel from '../models/category.model';
import MongoClient from '../class/mongo.class';
import logger from '../config/winston';

class CategoryService {
  constructor() {
    this.conn = new MongoClient();
    this.collection = CategoryModel;
  }

  async findByName(categoryName) {
    try {
      this.conn.connect();
      const data = await this.collection.findOne({ name: categoryName });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async newCategory(categoryName) {
    try {
      this.conn.connect();
      const data = await this.collection.create({ categoryName });
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

export default CategoryService;
