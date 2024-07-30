import { Request, Response, NextFunction } from 'express';
import kalatoriService from '../services/kalatoriService';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;
  const { amount, currency, callback } = req.body;

  try {
    const orderData = await kalatoriService.createOrder(orderId, amount, currency, callback);
    res.status(201).json(orderData);
  } catch (error: any) {
    console.error('Error in createOrder controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const forceWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const withdrawalData = await kalatoriService.forceWithdrawal(orderId);
    res.status(201).json(withdrawalData);
  } catch (error: any) {
    console.error('Error in forceWithdrawal controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getPaymentStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { paymentAccount } = req.params;

  try {
    const statusData = await kalatoriService.getPaymentStatus(paymentAccount);
    res.json(statusData);
  } catch (error: any) {
    console.error('Error in getPaymentStatus controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const investigateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const investigationData = await kalatoriService.investigateOrder(orderId);
    res.status(201).json(investigationData);
  } catch (error: any) {
    console.error('Error in investigateOrder controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

export default {
  createOrder,
  forceWithdrawal,
  getPaymentStatus,
  investigateOrder,
};
