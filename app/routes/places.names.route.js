const express = require('express');
const commonController = require('../controllers/common.controller');
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

router.get('/counteries',  auth("readOwn", "profile"),commonController.getCountries);
router.get('/states',auth("readOwn", "profile"), commonController.getStates);
router.get('/cities',auth("readOwn", "profile"), commonController.getCities);


module.exports = router