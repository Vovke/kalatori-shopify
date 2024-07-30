import { Request, Response, NextFunction } from 'express';
import kalatoriService from '../services/kalatoriService';

const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthData = await kalatoriService.getHealth();
    res.json(healthData);
  } catch (error: any) {
    console.error('Error in getHealth controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

export default { getHealth };
