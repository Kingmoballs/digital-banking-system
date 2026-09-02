const nibssAccount = require("../../integrations/nibss/nibss.account");

const createAccount = async (data) => {
  return await nibssAccount.createAccount(data);
};

const nameEnquiry = async (accountNumber) => {
  return await nibssAccount.nameEnquiry(accountNumber);
};

const getBalance = async (accountNumber) => {
  return await nibssAccount.getBalance(accountNumber);
};

const getAccounts = async () => {
  return await nibssAccount.getAccounts();
};

module.exports = {
  createAccount,
  nameEnquiry,
  getBalance,
  getAccounts,
};