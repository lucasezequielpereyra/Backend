import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://lucasezequiel:riverplate123@cluster0.qzap6.mongodb.net/clase24?retryWrites=true&w=majority',
  )
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
