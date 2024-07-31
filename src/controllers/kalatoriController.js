const kalatoriService = require('../services/kalatoriService');

const createOrder = async (orderId, amount, currency, callback) => {
  return await kalatoriService.createOrder(orderId, amount, currency, callback);
};

const getPaymentStatus = async (paymentAccount) => {
  return await kalatoriService.getPaymentStatus(paymentAccount);
};

module.exports = {
  createOrder,
  getPaymentStatus,
};
