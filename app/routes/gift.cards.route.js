const express = require('express');
const giftCardController = require('../controllers/gift.cards.controller');
const router = express.Router();

//Auyh Middleware
const auth = require("../middleware/auth");

router.post('/create-card',   auth("readAny", "Gift"),giftCardController.addNewGiftCardProduct);
router.post('/cards',  auth("readAny", "Gift"), giftCardController.getGiftCardProducts);
router.post('/new-digital-card-order', giftCardController.generateNewGiftCardOrder);


module.exports = router