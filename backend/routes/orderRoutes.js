const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

// GET user orders with vehicle details
router.get('/my-orders', auth, orderController.getUserOrders);

// Cancel an order
router.patch('/cancel/:id', auth, orderController.cancelOrder);

module.exports = router;