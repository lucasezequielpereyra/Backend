import MongoContainer from '../Class/mongodb.container';
import { faker } from '@faker-js/faker';

class ProductsDao extends MongoContainer {
  constructor() {
    super(
      'products',
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        img: {
          type: String,
        },
        timestamps: {
          type: String,
        },
      },
      {
        versionKey: false,
      },
    );
  }

  async createPorudctDao(name, price) {
    try {
      return await this.collection.create({
        name: name,
        price: price,
        img: faker.image.business(),
        timestamps: new Date(),
      });
    } catch (error) {
      return console.error(error);
    }
  }
}

export default ProductsDao;
