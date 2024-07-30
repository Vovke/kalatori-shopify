import dotenv from 'dotenv';

dotenv.config();

export const config = {
  kalatoriApiBaseUrl: process.env.KALATORI_API_BASE_URL || 'https://api.kalatori.com/v2',
  port: process.env.PORT || 3000,
  logLevel: process.env.LOG_LEVEL || 'info',
  paymentSessionUrl: process.env.PAYMENT_SESSION_URL || 'https://your-kalatori-server.com/app/payment_session',
};
