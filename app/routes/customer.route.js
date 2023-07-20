const express = require("express");
const customerController = require("../controllers/business.customer.controller");
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

//uploader for Avatar
const AvatarUploader = require("../uploader/avatar.uploader");
const BusinessCardUploader = require("../uploader/businessCard.uploader");
const KycDocumentUploader = require("../uploader/kyc.Doc.uploader");
const companyAgreementDocumentUploader = require("../uploader/business.agreement.uploader");

router.post("/add-business-customer-request",  auth("readOwn", "profile"), customerController.addNewBusinessCustomerrequest);
router.post("/verify-business-customer-request-otp",  auth("readOwn", "profile"), customerController.verifyBusinessCustomerrequest);
router.post("/save-business-customer-profile",  auth("updateOwn", "profile"),AvatarUploader.single("ProfileImage"), customerController.saveBusinessCustomerprofile);
router.post("/save-business-customer-shop-details",  auth("updateOwn", "profile"),BusinessCardUploader.single("BusinessCard"), customerController.saveBusinessCustomerShopDetails);
router.get("/get-business-customer-profile",  auth("readOwn", "profile"), customerController.getBusinessCustomerProfile);
router.post("/skip-business-customer-kyc",  auth("updateOwn", "profile"), customerController.skipBusinessCustomerKyc);
router.post("/save-business-customer-kyc-manualy",auth("updateOwn", "profile"),KycDocumentUploader.fields([
    { name: "frontAdhar", maxCount: 1 },
    { name: "backAdhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    ]),
    customerController.saveManualKycFile
  );
router.get("/get-user-business-agreement",  auth("updateOwn", "profile"), customerController.getUserBusinessAgreement);
router.post ("/upload-user-business-agreement",  auth("updateOwn", "profile"), companyAgreementDocumentUploader.fields({ name: "agreementDocument", maxCount: 1 }),customerController.uploadUserBusinessAgreement);

module.exports = router;
