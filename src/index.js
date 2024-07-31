const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const healthRoutes = require('./routes/healthRoutes');
const statusRoutes = require('./routes/statusRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express(); // Ensure app is declared only once

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
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

module.exports = app; // Export the app for testing purposes
