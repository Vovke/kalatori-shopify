require('dotenv').config();

module.exports = {
  kalatoriHost: process.env.KALATORI_HOST,
  kalatoriPort: process.env.KALATORI_PORT || 3000,
};
