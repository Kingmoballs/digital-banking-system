const nibssService = require("../../integrations/nibss/nibss.service");

const onboard = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const result = await nibssService.onboardFintech({
      name,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "Fintech onboarded successfully",
      data: {
        apiKey: result.apiKey,
        apiSecret: result.apiSecret,
        bankCode: result.bankCode,
        bankName: result.bankName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { apiKey, apiSecret } = req.body;

    if (!apiKey || !apiSecret) {
      return res.status(400).json({
        success: false,
        message: "apiKey and apiSecret are required",
      });
    }

    const result = await nibssService.authenticateFintech({
      apiKey,
      apiSecret,
    });

    return res.status(200).json({
      success: true,
      message: "NIBSS authentication successful",
      data: {
        token: result.token,
        fintech: result.fintech,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  onboard,
  authenticate,
};