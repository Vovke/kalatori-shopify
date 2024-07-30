import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config/config';
import healthRoutes from './routes/healthRoutes';
import statusRoutes from './routes/statusRoutes';
import orderRoutes from './routes/orderRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

const app: Application = express(); // Ensure app is declared only once

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use(healthRoutes);
app.use(statusRoutes);
app.use(orderRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(config.kalatoriPort, () => {
  console.log(`Server is running on port ${config.kalatoriPort}`);
});

export default app; // Export the app for testing purposes
