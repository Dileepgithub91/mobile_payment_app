const express = require('express');
const worldController = require('../controllers/world.controller');
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

router.get('/counteries',  auth("readOwn", "profile"),worldController.getCountries);
router.get('/states',auth("readOwn", "profile"), worldController.getStates);
router.get('/cities',auth("readOwn", "profile"), worldController.getCities);


module.exports = router