const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");



router.get('/',  auth("readOwn", "Order"), orderController.getOrderDetails);
router.post('/',   auth("createOwn", "Order"),orderController.createOrder);



module.exports = router