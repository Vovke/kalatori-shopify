const axios = require('axios');
const config = require('../config/config');

const kalatoriInstance = axios.create({
  baseURL: config.kalatoriApiBaseUrl,
});

const createOrder = async (orderId, amount, currency, callback) => {
  try {
    const response = await kalatoriInstance.post(`/v2/order/${orderId}`, {
      amount,
      currency,
      callback,
    });
    return response.data;
  } catch (error) {
    console.error('Error in createOrder:', error.message);
    throw error;
  }
};

const getPaymentStatus = async (paymentAccount) => {
  try {
    const response = await kalatoriInstance.post(`/v2/payment/${paymentAccount}`);
    return response.data;
  } catch (error) {
    console.error('Error in getPaymentStatus:', error.message);
    throw error;
  }
};

const forceWithdrawal = async (orderId) => {
  try {
    const response = await kalatoriInstance.post(`/v2/order/${orderId}/forceWithdrawal`);
    return response.data;
  } catch (error) {
    console.error('Error in forceWithdrawal:', error.message);
    throw error;
  }
};

module.exports = {
  createOrder,
  getPaymentStatus,
  forceWithdrawal,
};
