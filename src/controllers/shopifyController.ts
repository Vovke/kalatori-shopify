import { kalatoriController } from './kalatoriController';

const createPaymentSession = async (params: any, shopDomain: string) => {
  const { id, amount, currency, callback } = params;
  return await kalatoriController.createOrder(id, amount, currency, callback);
};

const getPaymentStatus = async (paymentAccount: string) => {
  return await kalatoriController.getPaymentStatus(paymentAccount);
};

export const shopifyController = {
  createPaymentSession,
  getPaymentStatus,
};
