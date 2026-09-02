const express = require("express");
const accountController = require("./account.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create", 
  authMiddleware,
  accountController.createAccount
);

router.get(
  "/name-enquiry/:accountNumber",
  authMiddleware,
  accountController.nameEnquiry
);

router.get(
  "/balance/:accountNumber",
  authMiddleware,
  accountController.getBalance
);

router.get(
  "/",
  authMiddleware,
  accountController.getAccounts
);

module.exports = router;