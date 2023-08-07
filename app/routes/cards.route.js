const express = require('express');
const cardController = require('../controllers/cards.controller');
const router = express.Router();

//Auyh Middleware
const auth = require("../middleware/auth");


router.get('/gift-cards',  auth("readAny", "Gift"), cardController.getGiftCards);
router.get('/pre-paid-cards',  auth("readAny", "Gift"), cardController.getPrePaidCards);
router.get('/card',  auth("readAny", "Gift"), cardController.getCardDetails);


module.exports = router