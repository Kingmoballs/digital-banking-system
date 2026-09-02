require("dotenv").config();

const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nibssBaseUrl: process.env.NIBSS_BASE_URL,
  nibssApiKey: process.env.NIBSS_API_KEY,
  nibssApiSecret: process.env.NIBSS_API_SECRET,
};

module.exports = env;