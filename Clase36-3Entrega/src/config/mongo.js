import mongoose from "mongoose";
import logger from "./winston";

const DATABASE_CONNECT = process.env.DATABASE_CONNECT;

export const dbConnect = () => {
  mongoose
    .connect(DATABASE_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info.info("db is connected"))
    .catch((err) => logger.error.error(err));
};
