import { Request, Response, NextFunction } from 'express';
import kalatoriService from '../services/kalatoriService';

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusData = await kalatoriService.getStatus();
    res.json(statusData);
  } catch (error: any) {
    console.error('Error in getStatus controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

export default { getStatus };
