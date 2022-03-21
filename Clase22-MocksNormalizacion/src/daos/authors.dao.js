import MongoContainer from '../Class/mongodb.container';
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
        avatar: faker.image.avatar(),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthorsDao;
