const express = require('express');
const cardController = require('../controllers/cards.controller');
const router = express.Router();

//Auyh Middleware
const auth = require("../middleware/auth");

router.get('/update-cards-admin', cardController.updateNewGiftCardProduct);
router.get('/cards',  auth("readAny", "Gift"), cardController.getCards);
router.get('/card',  auth("readAny", "Gift"), cardController.getCardDetails);


module.exports = router