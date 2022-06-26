import UserModel from '../models/user.model';
import MongoClient from '../class/mongo.class';
import logger from '../config/winston';

class AuthService {
  constructor() {
    this.collection = UserModel;
    this.conn = new MongoClient();
  }

  async newUser(user) {
    try {
      this.conn.connect();
      const data = await this.collection.create({
        email: user._email,
        password: await UserModel.encryptPassword(user._password),
        name: user._name,
        address: user._address,
        age: user._age,
        phone: user._phone,
      });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findUserByEmail(email) {
    try {
      this.conn.connect();
      const data = await UserModel.find({ email: email });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async findUserById(id) {
    try {
      this.conn.connect();
      const data = await this.collection.findOne({ _id: id });
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async encryptPassword(password) {
    try {
      this.conn.connect();
      const data = await this.collection.encryptPassword(password);
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }

  async comparePassword(user, password) {
    try {
      this.conn.connect();
      const data = await this.collection.comparePassword(user, password);
      return data;
    } catch (err) {
      logger.error.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
    }
  }
}

export default AuthService;
