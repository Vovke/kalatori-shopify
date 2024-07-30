import { kalatoriService } from '../services/kalatoriService';

const createOrder = async (orderId: string, amount: number, currency: string, callback: string) => {
  return await kalatoriService.createOrder(orderId, amount, currency, callback);
};

const getPaymentStatus = async (paymentAccount: string) => {
  return await kalatoriService.getPaymentStatus(paymentAccount);
};

export const kalatoriController = {
  createOrder,
  getPaymentStatus,
};
