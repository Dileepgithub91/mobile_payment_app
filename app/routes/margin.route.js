const express = require('express');
const marginController = require('../controllers/margin.controller');
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

//margin Group api 
router.post('/margin-group', auth("readAny", "profile"), marginController.createMarginGroup);
router.patch('/margin-group/edit', auth("readAny", "profile"), marginController.editMarginGroup);
router.patch('/margin-group/status', auth("readAny", "profile"), marginController.updateMarginGroupStatus);
router.get('/margin-groups', auth("readAny", "profile"), marginController.getMarginGroup);
router.get('/margin-group', auth("readAny", "profile"), marginController.getMarginGroupDetails);
//Sales margin api 
router.post('/sales-margin', auth("readAny", "profile"), marginController.createSalesMargin);
router.patch('/sales-margin/edit', auth("readAny", "profile"), marginController.editSalesMargin);
router.patch('/sales-margin/status', auth("readAny", "profile"), marginController.updateSalesMarginStatus);
router.get('/sales-margins', auth("readAny", "profile"), marginController.getSalesMargin);
router.get('/sales-margin', auth("readAny", "profile"), marginController.getSalesMarginDetails);
//Purchase margin api 
router.post('/purchase-margin', auth("readAny", "profile"), marginController.createPurchseMargin);
router.patch('/purchase-margin/edit', auth("readAny", "profile"), marginController.editPurchseMargin);
router.patch('/purchase-margin/status', auth("readAny", "profile"), marginController.updatePurchseMarginStatus);
router.get('/purchase-margins', auth("readAny", "profile"), marginController.getPurchseMargin);
router.get('/purchase-margin', auth("readAny", "profile"), marginController.getPurchseMarginDetails);


module.exports = router