const express = require("express");
const businessUserController = require("../controllers/business.user.controller");
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

//uploader for Avatar
const AvatarUploader = require("../uploader/avatar.uploader");
const BusinessCardUploader = require("../uploader/businessCard.uploader");
const KycDocumentUploader = require("../uploader/kyc.Doc.uploader");
const CompanyAgreementDocumentUploader = require("../uploader/business.agreement.uploader");

router.post("/add-business-user-request",businessUserController.addBusinessUserRequest);
router.post("/request-otp/resend",businessUserController.resendBusinessUserRequestOtp);
router.post("/request-otp/verify",businessUserController.verifyBusinessUserRequest);
router.post("/profile",  auth("updateOwn", "profile"),AvatarUploader.single("ProfileImage"), businessUserController.saveBusinessUserProfile);
router.post("/shop-detail",  auth("updateOwn", "profile"),BusinessCardUploader.single("BusinessCard"), businessUserController.saveBusinessUserShopDetails);
router.get("/profile",  auth("readOwn", "profile"), businessUserController.getBusinessUserProfile);
router.post("/skip-kyc",  auth("updateOwn", "profile"), businessUserController.skipBusinessUserKyc);
router.post("/save-kyc-manualy",auth("updateOwn", "profile"),KycDocumentUploader.fields([
    { name: "frontAdhar", maxCount: 1 },
    { name: "backAdhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    ]),
    businessUserController.saveManualKycFile
  );
router.get("/get-agreement",  auth("updateOwn", "profile"), businessUserController.getBusinessUserAgreement);
router.post ("/upload-agreement",  auth("updateOwn", "profile"), CompanyAgreementDocumentUploader.fields({ name: "agreementDocument", maxCount: 1 }),businessUserController.uploadBusinessUserAgreement);

module.exports = router;
