const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/v2/order/:orderId', orderController.createOrder);
router.post('/v2/order/:orderId/forceWithdrawal', orderController.forceWithdrawal);
router.post('/public/v2/payment/:paymentAccount', orderController.getPaymentStatus);
router.post('/v2/order/:orderId/investigate', orderController.investigateOrder);

module.exports = router;
