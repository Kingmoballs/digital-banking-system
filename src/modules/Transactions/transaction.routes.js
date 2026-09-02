const express = require("express");

const transactionController = require("./transaction.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.get(
  "/:transactionId",
  authMiddleware,
  transactionController.getTransactionStatus
);

module.exports = router;