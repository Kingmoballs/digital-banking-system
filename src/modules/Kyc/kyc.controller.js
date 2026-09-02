const kycService = require("../../integrations/nibss/nibss.kyc");

const validateBvn = async (req, res, next) => {
  try {
    const { bvn } = req.body;

    if (!bvn) {
      return res.status(400).json({
        success: false,
        message: "BVN is required",
      });
    }

    const result = await kycService.validateBvn(bvn);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const validateNin = async (req, res, next) => {
  try {
    const { nin } = req.body;

    if (!nin) {
      return res.status(400).json({
        success: false,
        message: "NIN is required",
      });
    }

    const result = await kycService.validateNin(nin);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const registerBvn = async (req, res, next) => {
  try {
    const {
      bvn,
      firstName,
      lastName,
      dob,
      phone,
    } = req.body;

    if (!bvn || !/^\d{11}$/.test(bvn)) {
      return res.status(400).json({
        success: false,
        message: "BVN must be exactly 11 digits",
      });
    }

    if (!firstName || !lastName || !dob || !phone) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, dob and phone are required",
      });
    }

    const result = await kycService.registerBvn({
      bvn,
      firstName,
      lastName,
      dob,
      phone,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const registerNin = async (req, res, next) => {
  try {
    const {
      nin,
      firstName,
      lastName,
      dob,
    } = req.body;

    if (!nin || !/^\d{11}$/.test(nin)) {
      return res.status(400).json({
        success: false,
        message: "NIN must be exactly 11 digits",
      });
    }

    if (!firstName || !lastName || !dob) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName and dob are required",
      });
    }

    const result = await kycService.registerNin({
      nin,
      firstName,
      lastName,
      dob,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateBvn,
  validateNin,
  registerBvn,
  registerNin,
};