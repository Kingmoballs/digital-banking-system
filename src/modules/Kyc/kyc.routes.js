const express = require("express");

const kycController = require("./kyc.controller");

const router = express.Router();

router.post("/bvn/register", kycController.registerBvn);
router.post("/nin/register", kycController.registerNin);

router.post("/bvn/validate", kycController.validateBvn);
router.post("/nin/validate", kycController.validateNin);

module.exports = router;