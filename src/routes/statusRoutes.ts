import express from 'express';
import statusController from '../controllers/statusController';

const router = express.Router();

router.get('/v2/status', statusController.getStatus);

export default router;
