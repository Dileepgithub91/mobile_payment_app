const express = require('express');
const giftCardController = require('../controllers/gift.cards.controller');
const router = express.Router();

//Auyh Middleware
const auth = require("../middleware/auth");

router.post('/update-gift-card-list',   auth("readAny", "Gift"),giftCardController.addNewGiftCardProduct);
router.post('/get-gift-card-list',  auth("readAny", "Gift"), giftCardController.getGiftCardProducts);
//pineperk
router.post('/new-digital-card-order', giftCardController.generateNewGiftCardOrder);


module.exports = router