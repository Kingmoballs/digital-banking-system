const transactionService = require("./transaction.service");

const getTransactionStatus = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction =
      await transactionService.getTransactionStatus(transactionId);

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactionStatus,
};