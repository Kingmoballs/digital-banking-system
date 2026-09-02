const express = require("express");

const nibssController = require("./nibss.controller");

const router = express.Router();

router.post("/onboard", nibssController.onboard);
router.post("/login", nibssController.authenticate);

module.exports = router;