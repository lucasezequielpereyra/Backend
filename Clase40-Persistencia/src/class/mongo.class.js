import mongoose from 'mongoose';
import logger from '../config/winston';

class MongoClient {
  constructor() {
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      this.client.connect(process.env.DATABASE_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      this.connected = true;
    } catch (err) {
      logger.error.error(err);
    }
  }

  async disconnect() {
    try {
      this.connected = false;
    } catch (err) {
      logger.error.error(err);
    }
  }
}

export default MongoClient;
