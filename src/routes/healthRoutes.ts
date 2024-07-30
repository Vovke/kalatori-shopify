import express from 'express';
import healthController from '../controllers/healthController';

const router = express.Router();

router.get('/v2/health', healthController.getHealth);

export default router;
