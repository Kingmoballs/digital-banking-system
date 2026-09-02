const transferService = require("./transfer.service");

const transfer = async (req, res, next) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "from, to and amount are required",
      });
    }

    if (!/^\d{10}$/.test(from)) {
      return res.status(400).json({
        success: false,
        message: "Sender account number must be exactly 10 digits",
      });
    }

    if (!/^\d{10}$/.test(to)) {
      return res.status(400).json({
        success: false,
        message: "Recipient account number must be exactly 10 digits",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (from === to) {
      return res.status(400).json({
        success: false,
        message: "Sender and recipient accounts cannot be the same",
      });
    }

    const result = await transferService.transfer({
      from,
      to,
      amount: numericAmount,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  transfer,
};