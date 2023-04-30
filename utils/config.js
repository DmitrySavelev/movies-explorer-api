const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key',
  MONGODB_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/bitfilmsdb',
};
