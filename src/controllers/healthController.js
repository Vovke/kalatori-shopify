const kalatoriService = require('../services/kalatoriService');

const getHealth = async (req, res, next) => {
  try {
    const healthData = await kalatoriService.getHealth();
    res.json(healthData);
  } catch (error) {
    console.error('Error in getHealth controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = {
  getHealth,
};
