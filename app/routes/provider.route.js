const express = require('express');
const providerController = require('../controllers/provider.controller');
const router = express.Router();

//Auth Middleware
const auth = require("../middleware/auth");

router.get('/all', auth("readOwn", "Order"), providerController.getProvider);
router.get('/provider', auth("readOwn", "Order"), providerController.getProviderDetails);


module.exports = router