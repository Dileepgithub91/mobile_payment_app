const express = require('express');
const registerController = require('../controllers/registration.controller');
const router = express.Router();


router.post('/login', registerController.loginViaPassowrd);
router.post('/forget-passowrd/send-otp', registerController.sendForgetPasswordOtp);
router.post('/forget-passowrd/resend-otp', registerController.reSendForgetPasswordOtp);
router.post('/forget-passowrd/verify-otp', registerController.verifyForgetPasswordOtp);
router.post('/forget-passowrd/change-password', registerController.forgetPasswordChangePassword);////working


module.exports = router