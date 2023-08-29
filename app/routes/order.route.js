const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");

router.get('/order',  auth("readOwn", "Order"), orderController.getOrderDetails);
router.get('/all',  auth("readOwn", "Order"), orderController.getOrders);
router.post('/',   auth("createOwn", "Order"),orderController.createOrder);
router.post('/products',   auth("createOwn", "Order"),orderController.createMultiProductOrder);
router.post('/bulk/status',   auth("createOwn", "Order"),orderController.bulkOrderUpdateStatus);
router.post('/status',   auth("createOwn", "Order"),orderController.checkOrderStatus);



module.exports = router