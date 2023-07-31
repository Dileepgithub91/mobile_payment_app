const express = require('express');
const qwikcilverController = require('../controllers/giftcard.qwikcilver.controller');
const router = express.Router();


router.post('/get-categories-list', qwikcilverController.getCategories);
router.post('/get-categories-details', qwikcilverController.getCategoriesdetails);
router.post('/get-products-list', qwikcilverController.getProductList);
router.post('/get-product-details', qwikcilverController.getProductDetails);
router.post('/bank-beneficiary-validation', qwikcilverController.bankBeneficiaryValidation);
router.post('/upi-beneficiary-validation', qwikcilverController.upiBeneficiaryValidation);
router.post('/create-order-for-gift-card', qwikcilverController.createAnOrderForGiftCard);
router.post('/get-card-order-details', qwikcilverController.getOrderDetailsAPi);
router.post('/get-card-order-lists', qwikcilverController.getOrderListAPi);
router.post('/get-card-order-status', qwikcilverController.getOrderStatusAPi);
router.post('/get-activated-card', qwikcilverController.getActivatedCardApi);
router.post('/get-card-balance', qwikcilverController.getCardBalance);
router.post('/resend-order', qwikcilverController.orderResendAPi);
router.post('/reverse-order', qwikcilverController.orderReverseApi);
router.post('/get-transection-history', qwikcilverController.transectionHistoryApi);


module.exports = router