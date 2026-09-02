const nibssClient = require("./nibss.client");

const login = async ({ apiKey, apiSecret }) => {
  const response = await nibssClient.post("/api/auth/token", {
    apiKey,
    apiSecret,
  });

  return response.data;
};

module.exports = {
  login,
};