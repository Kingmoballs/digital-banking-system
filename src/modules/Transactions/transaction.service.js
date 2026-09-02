const Transaction = require("./transaction.model");
const nibssTransaction = require("../../integrations/nibss/nibss.transaction");

const getTransactionStatus = async (transactionId) => {
  const transaction = await Transaction.findOne({
    transactionId,
  });

  if (!transaction) {
    const nibssTransactionData =
      await nibssTransaction.getTransactionStatus(transactionId);

    return nibssTransactionData;
  }

  const nibssTransactionData =
    await nibssTransaction.getTransactionStatus(transactionId);

  transaction.status = nibssTransactionData.status;

  await transaction.save();

  return transaction;
};

module.exports = {
  getTransactionStatus,
};