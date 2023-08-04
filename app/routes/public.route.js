const express = require('express');
const registerController = require('../controllers/registration.controller');
const router = express.Router();


router.post('/registration/send-otp', registerController.getRegisterOtp);
router.post('/registration/verify-otp', registerController.verifyRegisterOtp);
router.post('/registration/resend-otp', registerController.getResendOtp);


module.exports = router