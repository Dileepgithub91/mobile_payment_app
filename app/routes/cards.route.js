const express = require('express');
const cardController = require('../controllers/cards.controller');
const router = express.Router();

//upload csv 
const UploadedCardUploader =require("../uploader/uploaded.card.uploader");

//Auyh Middleware
const auth = require("../middleware/auth");


router.get('/gift-cards',  auth("readAny", "Gift"), cardController.getGiftCards);
router.get('/pre-paid-cards',  auth("readAny", "Gift"), cardController.getPrePaidCards);
router.get('/card',  auth("readAny", "Gift"), cardController.getCardDetails);

//uploaded Cards
router.get('/uploaded/cards',   cardController.getUploadedCard);
router.get('/uploaded/card',  auth("readAny", "Gift"), cardController.getUploadedCardDetails);
router.post('/uploaded/card/edit',  auth("readAny", "Gift"), cardController.updateUploadedCard);
router.post('/uploaded/card/add', cardController.createUploadedCard);
//temp uploaded cards
router.get('/temp/uploaded/cards',   cardController.getTempUploadedCard);
router.get('/temp/uploaded/card',  auth("readAny", "Gift"), cardController.getTempUploadedCardDetails);
router.post('/temp/uploaded/edit',  auth("readAny", "Gift"), cardController.updateTempUploadedCard);
router.post('/temp/uploaded/add', cardController.createTempUploadedCard);
router.post('/temp/uploaded/bulk',UploadedCardUploader.fields([{ name: "file_csv", maxCount: 1 }]), cardController.bulkCreateTempUploadedCard);

//Card Format APi
router.get('/formats',   cardController.getCardFormat);
router.get('/format',  auth("readAny", "Gift"), cardController.getCardFormatDetails);
//Card provider setting APi
router.get('/providers',   cardController.getCardProviders);
router.get('/provider',  auth("readAny", "Gift"), cardController.getCardProviderDetails);

module.exports = router