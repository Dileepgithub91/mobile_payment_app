const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();


router.post('/registration-send-otp', authController.getRegisterOtp);
router.post('/registration-verify-otp', authController.verifyRegisterOtp);
router.post('/registration-resend-otp', authController.getResendOtp);


module.exports = router