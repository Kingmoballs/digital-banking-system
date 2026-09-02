const nibssClient = require("./nibss.client");
const { getAccessToken } = require("./nibss.token");

const getTransactionStatus = async (transactionId) => {
  const token = await getAccessToken();

  try {
    const response = await nibssClient.get(
      `/api/transaction/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("===== NIBSS TSQ ERROR =====");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Transaction ID:", transactionId);
    console.log("===========================");

    throw error;
  }
};

module.exports = {
  getTransactionStatus,
};