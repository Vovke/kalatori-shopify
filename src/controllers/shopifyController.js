const kalatoriController = require('./kalatoriController');

const createPaymentSession = async (params) => {
  const { id, amount, currency, callback } = params;
  return await kalatoriController.createOrder(id, amount, currency, callback);
};

const getPaymentStatus = async (paymentAccount) => {
  return await kalatoriController.getPaymentStatus(paymentAccount);
};

module.exports = {
  createPaymentSession,
  getPaymentStatus,
};
