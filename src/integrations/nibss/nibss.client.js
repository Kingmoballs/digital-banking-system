const axios = require("axios");
const env = require("../../config/env");

const nibssClient = axios.create({
  baseURL: env.nibssBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

module.exports = nibssClient;