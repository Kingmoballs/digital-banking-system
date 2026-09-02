const nibssClient = require("./nibss.client");
const nibssAuth = require("./nibss.auth");

const onboardFintech = async ({ name, email }) => {
  const response = await nibssClient.post("/api/fintech/onboard", {
    name,
    email,
  });

  return response.data;
};

const authenticateFintech = async ({ apiKey, apiSecret }) => {
  return nibssAuth.login({
    apiKey,
    apiSecret,
  });
};

module.exports = {
  onboardFintech,
  authenticateFintech,
};