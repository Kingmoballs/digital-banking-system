const nibssClient = require("./nibss.client");
const { getAccessToken } = require("./nibss.token");

const getAuthConfig = async () => {
  const token = await getAccessToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const createAccount = async ({ kycType, kycID, dob }) => {
  const config = await getAuthConfig();

  const response = await nibssClient.post(
    "/api/account/create",
    {
      kycType,
      kycID,
      dob,
    },
    config
  );

  return response.data;
};

const nameEnquiry = async (accountNumber) => {
  const config = await getAuthConfig();

  const response = await nibssClient.get(
    `/api/account/name-enquiry/${accountNumber}`,
    config
  );

  return response.data;
};

const getBalance = async (accountNumber) => {
  const config = await getAuthConfig();

  const response = await nibssClient.get(
    `/api/account/balance/${accountNumber}`,
    config
  );

  return response.data;
};

const getAccounts = async () => {
  const config = await getAuthConfig();

  const response = await nibssClient.get(
    "/api/accounts",
    config
  );

  return response.data;
};

module.exports = {
  createAccount,
  nameEnquiry,
  getBalance,
  getAccounts,
};