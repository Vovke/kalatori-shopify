require('dotenv').config();

module.exports = {
  kalatoriHost: process.env.KALATORI_HOST,
  port: process.env.PORT || 3000,
};
