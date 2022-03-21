import MongoContainer from '../Class/mongodb.container';
import { Schema } from 'mongoose';
import { faker } from '@faker-js/faker';

class AuthorsDao extends MongoContainer {
  constructor() {
    super(
      'authors',
      {
        name: {
          type: String,
        },
        lastname: {
          type: String,
        },
        age: {
          type: Number,
        },
        alias: {
          type: String,
        },
        avatar: {
          type: String,
          default: faker.image.avatar(),
        },
      },
      {
        versionKey: false,
      },
    );
  }

  async createAuthorDao(name, lastName, age, alias) {
    try {
      return await this.collection.create({
        name: name,
        lastName: lastName,
        age: age,
        alias: alias,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthorsDao;
