const express = require('express');
const walletController = require('../controllers/wallet.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");


router.get('/',  auth("readAny", "Order"), walletController.getWallets);
router.get('/wallet',  auth("readOwn", "Order"), walletController.getWalletsDetails);
router.post('/update/status',   auth("readAny", "Order"),walletController.updateWalletStatus);


module.exports = router