import { kalatoriService } from './kalatoriService';

export const RESOLVE = 'RESOLVE';
export const REJECT = 'REJECT';
export const PENDING = 'PENDING';

export const createPaymentSession = async (params: any) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw error;
  }
};

export const getPaymentStatus = async (paymentAccount: string) => {
  try {
    const response = await kalatoriService.getPaymentStatus(paymentAccount);
    return response;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

export const getPaymentSession = async (id: string) => {
  try {
    // Replace this with the actual logic to get the payment session by ID
    const response = await kalatoriService.getPaymentStatus(id);
    return response;
  } catch (error) {
    console.error('Error getting payment session:', error);
    throw error;
  }
};

export const createCaptureSession = async (params: any) => {
  try {
    const response = await kalatoriService.forceWithdrawal(params.id);
    return response;
  } catch (error) {
    console.error('Error creating capture session:', error);
    throw error;
  }
};

export const createRefundSession = async (params: any) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating refund session:', error);
    throw error;
  }
};

export const createVoidSession = async (params: any) => {
  try {
    const response = await kalatoriService.createOrder(params.id, params.amount, params.currency, params.callback);
    return response;
  } catch (error) {
    console.error('Error creating void session:', error);
    throw error;
  }
};
