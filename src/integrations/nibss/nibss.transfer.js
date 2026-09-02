const nibssClient = require("./nibss.client");
const { getAccessToken } = require("./nibss.token");

const transfer = async ({ from, to, amount }) => {
  const token = await getAccessToken();

  try {
    const response = await nibssClient.post(
      "/api/transfer",
      {
        from,
        to,
        amount: String(amount),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("===== NIBSS TRANSFER ERROR =====");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Request Data:", {
      from,
      to,
      amount: String(amount),
    });
    console.log("================================");

    throw error;
  }
};

module.exports = {
  transfer,
};