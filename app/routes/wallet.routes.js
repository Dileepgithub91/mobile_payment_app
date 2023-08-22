const express = require('express');
const walletController = require('../controllers/wallet.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");


router.get('/',  auth("readOwn", "Order"), walletController.getWallets);
router.get('/new',  auth("readOwn", "Order"), walletController.newUserActivateWallet);
router.get('/wallet',  auth("readOwn", "Order"), walletController.getWalletsDetails);
router.post('/update/status',   auth("readOwn", "Order"),walletController.updateWalletStatus);


module.exports = router