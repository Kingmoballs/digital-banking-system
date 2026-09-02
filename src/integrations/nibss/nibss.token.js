const nibssClient = require("./nibss.client");
const env = require("../../config/env");

let accessToken = null;
let tokenExpiresAt = null;

const getAccessToken = async () => {
  // Reuse token if it is still valid
  if (
    accessToken &&
    tokenExpiresAt &&
    Date.now() < tokenExpiresAt
  ) {
    return accessToken;
  }

  // Request a new token from NIBSS
  const response = await nibssClient.post("/api/auth/token", {
    apiKey: env.nibssApiKey,
    apiSecret: env.nibssApiSecret,
  });

  accessToken = response.data.token;

  // Token is valid for 1 hour according to the documentation.
  // Refresh 1 minute before expiry.
  tokenExpiresAt = Date.now() + (60 * 60 * 1000) - (60 * 1000);

  return accessToken;
};

module.exports = {
  getAccessToken,
};