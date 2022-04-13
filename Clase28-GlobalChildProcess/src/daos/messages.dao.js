import MongoContainer from '../Class/mongodb.container';
import { Schema } from 'mongoose';

class MessagesDao extends MongoContainer {
  constructor() {
    super(
      'messages',
      {
        author: [
          {
            ref: 'authors',
            type: Schema.Types.ObjectId,
          },
        ],
        text: {
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

  async createMessageDao(idAuthor, text) {
    try {
      return await this.collection.create({
        author: idAuthor,
        text: text,
        timestamps: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async listMessages() {
    try {
      return await this.collection
        .find({})
        .sort({ timestamps: -1 })
        .populate({ path: 'author' });
    } catch (error) {
      return error;
    }
  }
}

export default MessagesDao;
