const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");


router.get('/',  auth("readOwn", "Order"), orderController.getOrders);
router.get('/order',  auth("readOwn", "Order"), orderController.getOrderDetails);
router.post('/order',   auth("saveOwn", "Order"),orderController.saveOrder);
router.post('/update',   auth("readAny", "Order"),orderController.editOrder);
router.post('/update/status',   auth("readAny", "Order"),orderController.updateOrderStatus);


module.exports = router