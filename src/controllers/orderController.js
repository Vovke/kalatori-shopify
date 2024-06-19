const kalatoriService = require('../services/kalatoriService');

const createOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { amount, currency, callback } = req.body;

  try {
    const orderData = await kalatoriService.createOrder(orderId, amount, currency, callback);
    res.status(201).json(orderData);
  } catch (error) {
    console.error('Error in createOrder controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const forceWithdrawal = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const withdrawalData = await kalatoriService.forceWithdrawal(orderId);
    res.status(201).json(withdrawalData);
  } catch (error) {
    console.error('Error in forceWithdrawal controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getPaymentStatus = async (req, res, next) => {
  const { paymentAccount } = req.params;

  try {
    const statusData = await kalatoriService.getPaymentStatus(paymentAccount);
    res.json(statusData);
  } catch (error) {
    console.error('Error in getPaymentStatus controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const investigateOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const investigationData = await kalatoriService.investigateOrder(orderId);
    res.status(201).json(investigationData);
  } catch (error) {
    console.error('Error in investigateOrder controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = {
  createOrder,
  forceWithdrawal,
  getPaymentStatus,
  investigateOrder,
};
