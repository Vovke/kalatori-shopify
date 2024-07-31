import axios from 'axios';
import { config } from '../config/config';

const kalatoriInstance = axios.create({
  baseURL: config.kalatoriApiBaseUrl,
});

const createOrder = async (orderId: string, amount: number, currency: string, callback: string) => {
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

const getPaymentStatus = async (paymentAccount: string) => {
  try {
    const response = await kalatoriInstance.post(`/v2/payment/${paymentAccount}`);
    return response.data;
  } catch (error) {
    console.error('Error in getPaymentStatus:', error.message);
    throw error;
  }
};

const forceWithdrawal = async (orderId: string) => {
  try {
    const response = await kalatoriInstance.post(`/v2/order/${orderId}/forceWithdrawal`);
    return response.data;
  } catch (error) {
    console.error('Error in forceWithdrawal:', error.message);
    throw error;
  }
};

export const kalatoriService = {
  createOrder,
  getPaymentStatus,
  forceWithdrawal,
};
