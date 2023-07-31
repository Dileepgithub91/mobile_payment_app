const express = require('express');
const pinePerksGiftCardController = require('../controllers/giftcards.pineperks.controller');
const router = express.Router();

//Authentication middleware  auth("readAny", "profile"),
const auth = require("../middleware/auth");

router.post('/get-schema',  pinePerksGiftCardController.getCardSchema);
router.post('/issue-instant-digital-card',  pinePerksGiftCardController.saveNewInstantDigitalCard);
router.post('/issue-bulk-digital-card', pinePerksGiftCardController.saveNewBulkDigitalCard);
router.post('/get-card-order-status', pinePerksGiftCardController.getCardOrderStatus);
router.post('/get-card-balance', pinePerksGiftCardController.getCardBalance);
router.post('/get-card-details', pinePerksGiftCardController.getCardDetails);
router.post('/get-card-transection-history', pinePerksGiftCardController.getCardTransectionHistory);
router.post('/update-card-transection-limit', pinePerksGiftCardController.updateCardTransectionLimit);
router.post('/update-customer-card-status', pinePerksGiftCardController.updateCustomerCardStatus);
router.post('/update-customer-card-status-by-admin', pinePerksGiftCardController.updateCustomerCardStatusByAdmin);


module.exports = router