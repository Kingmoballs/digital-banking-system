const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const nibssRoutes = require("./modules/Auth/nibss.route");
const kycRoutes = require("./modules/Kyc/kyc.routes");
const accountRoutes = require("./modules/Account/account.routes");
const transferRoutes = require("./modules/Transfer/transfer.routes");
const transactionRoutes = require("./modules/Transactions/transaction.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Digital Banking System API is running",
  });
});

app.use("/api/v1/nibss", nibssRoutes);
app.use("/api/v1/kyc", kycRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/transfer", transferRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;