const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

router.get('/v2/health', healthController.getHealth);

module.exports = router;
