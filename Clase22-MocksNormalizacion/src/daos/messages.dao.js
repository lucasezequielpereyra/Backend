import MongoContainer from '../Class/mongodb.container';
import { Schema } from 'mongoose';
const now = Date;

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
          default: now(),
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
      });
    } catch (error) {
      console.error(error);
    }
  }

  async listMessages() {
    try {
      return await this.collection.find({}).populate({ path: 'author' });
    } catch (error) {
      return error;
    }
  }
}

export default MessagesDao;
