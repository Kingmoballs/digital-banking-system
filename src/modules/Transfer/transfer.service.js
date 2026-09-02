const nibssTransfer = require("../../integrations/nibss/nibss.transfer");

const transfer = async ({ from, to, amount }) => {
  return await nibssTransfer.transfer({
    from,
    to,
    amount,
  });
};

module.exports = {
  transfer,
};