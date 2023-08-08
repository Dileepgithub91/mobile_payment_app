const express = require('express');
const providerController = require('../controllers/provider.controller');
const router = express.Router();

router.get('/all', providerController.getProvider);
router.get('/provider', providerController.getProviderDetails);


module.exports = router