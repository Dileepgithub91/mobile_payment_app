const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();


router.post('/genotp', authController.genPassCode);
// router.post('/register', authController.registerUser);
// // router.post('/signin', authController.signinUser);
// router.get('/test',auth(), authController.testAuthApi);


module.exports = router