import { kalatoriService } from './kalatoriService';

const createPaymentSession = async (params: any, shopDomain: string) => {
  return await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
};

const getPaymentStatus = async (paymentAccount: string) => {
  return await kalatoriService.getPaymentStatus(paymentAccount);
};

const createCaptureSession = async (params: any) => {
  const orderId = params.id;
  const response = await kalatoriService.forceWithdrawal(orderId);
  return response;
};

const createRefundSession = async (params: any) => {
  // TODO: add refund logic
  const orderId = params.id;
  const response = await kalatoriService.createOrder(orderId, params.amount, params.currency, params.callback);

  return response;
};

const createVoidSession = async (params: any) => {
  // TODO: add void logic
  const orderId = params.id;
  const response = await kalatoriService.createOrder(orderId, params.amount, params.currency, params.callback);

  return response;
};

export const shopifyService = {
  createPaymentSession,
  getPaymentStatus,
  createCaptureSession,
  createRefundSession,
  createVoidSession,
};
