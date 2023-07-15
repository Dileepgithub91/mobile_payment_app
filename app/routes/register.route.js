const express = require('express');
const registerController = require('../controllers/register.controller');
const router = express.Router();


router.post('/registration-send-otp', registerController.getRegisterOtp);
router.post('/registration-verify-otp', registerController.verifyRegisterOtp);
router.post('/registration-resend-otp', registerController.getResendOtp);
router.post('/login', registerController.loginViaPassowrd);
router.post('/forget-passowrd-send-otp', registerController.sendForgetPasswordOtp);
router.post('/forget-passowrd-verify-otp', registerController.loginViaPassowrd);


module.exports = router