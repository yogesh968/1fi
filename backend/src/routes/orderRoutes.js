const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, cancelOrder } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/:id/cancel', cancelOrder);

module.exports = router;
