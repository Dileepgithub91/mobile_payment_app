const express = require('express');
const registerController = require('../controllers/register.controller');
const router = express.Router();


router.post('/login', registerController.loginViaPassowrd);
router.post('/forget-passowrd-send-otp', registerController.sendForgetPasswordOtp);
router.post('/forget-passowrd-resend-otp', registerController.reSendForgetPasswordOtp);
router.post('/forget-passowrd-verify-otp', registerController.verifyForgetPasswordOtp);


module.exports = router