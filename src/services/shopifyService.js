const kalatoriService = require('./kalatoriService');

const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';
const PENDING = 'PENDING';

const createPaymentSession = async (params) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw error;
  }
};

const getPaymentStatus = async (paymentAccount) => {
  try {
    const response = await kalatoriService.getPaymentStatus(paymentAccount);
    return response;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

const getPaymentSession = async (id) => {
  try {
    const response = await kalatoriService.getPaymentStatus(id);
    return response;
  } catch (error) {
    console.error('Error getting payment session:', error);
    throw error;
  }
};

const createCaptureSession = async (params) => {
  try {
    const response = await kalatoriService.forceWithdrawal(params.id);
    return response;
  } catch (error) {
    console.error('Error creating capture session:', error);
    throw error;
  }
};

const createRefundSession = async (params) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating refund session:', error);
    throw error;
  }
};

const createVoidSession = async (params) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating void session:', error);
    throw error;
  }
};

module.exports = {
  RESOLVE,
  REJECT,
  PENDING,
  createPaymentSession,
  getPaymentStatus,
  getPaymentSession,
  createCaptureSession,
  createRefundSession,
  createVoidSession,
};
