import "dotenv/config";
import app from "./app";
import { dbConnect } from "./config/mongo";
import logger from "./config/winston";

const PORT = process.argv[2] || process.env.PORT || 8080;

dbConnect();

app.listen(PORT, () => {
  logger.info.info(`Server is running on port ${PORT}`);
});
