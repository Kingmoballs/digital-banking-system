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

const registerBvn = async ({
  bvn,
  firstName,
  lastName,
  dob,
  phone,
}) => {
  const config = await getAuthConfig();

  try {
    const response = await nibssClient.post(
      "/api/insertBvn",
      {
        bvn,
        firstName,
        lastName,
        dob,
        phone,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.log("===== NIBSS BVN REGISTRATION ERROR =====");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("========================================");

    throw error;
  }
};

const registerNin = async ({
  nin,
  firstName,
  lastName,
  dob,
}) => {
  const config = await getAuthConfig();

  try {
    const response = await nibssClient.post(
      "/api/insertNin",
      {
        nin,
        firstName,
        lastName,
        dob,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.log("===== NIBSS NIN REGISTRATION ERROR =====");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("========================================");

    throw error;
  }
};

const validateBvn = async (bvn) => {
  const config = await getAuthConfig();

  const response = await nibssClient.post(
    "/api/validateBvn",
    { bvn },
    config
  );

  return response.data;
};

const validateNin = async (nin) => {
  const config = await getAuthConfig();

  const response = await nibssClient.post(
    "/api/validateNin",
    { nin },
    config
  );

  return response.data;
};

module.exports = {
  registerBvn,
  registerNin,
  validateBvn,
  validateNin,
};