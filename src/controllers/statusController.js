const kalatoriService = require('../services/kalatoriService');

const getStatus = async (req, res, next) => {
  try {
    const statusData = await kalatoriService.getStatus();
    res.json(statusData);
  } catch (error) {
    console.error('Error in getStatus controller:', error.message);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = {
  getStatus,
};
