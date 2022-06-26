import 'dotenv/config';
import app from './app';
import logger from './config/winston';

const PORT = process.argv[2] || process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info.info(`Server is running on port ${PORT}`);
});
