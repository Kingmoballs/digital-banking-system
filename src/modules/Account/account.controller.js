const accountService = require("./account.service");

const createAccount = async (req, res, next) => {
  try {
    const { kycType, kycID, dob } = req.body;

    if (!kycType || !kycID || !dob) {
      return res.status(400).json({
        success: false,
        message: "kycType, kycID and dob are required",
      });
    }

    const normalizedKycType = kycType.toLowerCase();

    if (!["bvn", "nin"].includes(normalizedKycType)) {
      return res.status(400).json({
        success: false,
        message: "kycType must be either bvn or nin",
      });
    }

    if (!/^\d{11}$/.test(kycID)) {
      return res.status(400).json({
        success: false,
        message: "kycID must be exactly 11 digits",
      });
    }

    const result = await accountService.createAccount({
      kycType: normalizedKycType,
      kycID,
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

const nameEnquiry = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;

    if (!accountNumber || !/^\d{10}$/.test(accountNumber)) {
      return res.status(400).json({
        success: false,
        message: "Account number must be exactly 10 digits",
      });
    }

    const result = await accountService.nameEnquiry(accountNumber);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBalance = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;

    const result = await accountService.getBalance(accountNumber);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAccounts = async (req, res, next) => {
  try {
    const result = await accountService.getAccounts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
  nameEnquiry,
  getBalance,
  getAccounts,
};