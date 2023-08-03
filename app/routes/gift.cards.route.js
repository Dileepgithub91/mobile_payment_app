const express = require('express');
const giftCardController = require('../controllers/gift.cards.controller');
const router = express.Router();

//Auyh Middleware
const auth = require("../middleware/auth");

// router.post('/update-gift-card-list',   auth("readAny", "Gift"),giftCardController.updateNewGiftCardProduct);

router.get('/cards',  auth("readAny", "Gift"), giftCardController.getCards);
router.get('/card',  auth("readAny", "Gift"), giftCardController.getCardDetails);


module.exports = router