import mongoose from 'mongoose';
import { configMongo } from '../config';

mongoose
  .connect(configMongo.URL)
  .then(() => console.log('mongo db is connected'))
  .catch(error => console.log(error));

class MongoContainer {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  async listAll() {
    try {
      return await this.collection.find({});
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      return await this.collection.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
}

export default MongoContainer;
