const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");
//uploader for Avatar
const AvatarUploader = require("../uploader/avatar.uploader");
const KycDocumentUploader = require("../uploader/kyc.Doc.uploader");

router.post(
  "/save-user-profile",
  auth("updateOwn", "profile"),
  AvatarUploader.single("ProfileImage"),
  userController.updateUserProfile
); //auth("readOwn","profile")
router.get(
  "/get-user-profile",
  auth("readOwn", "profile"),
  userController.getUserProfile
);
router.post(
  "/save-user-kyc-manualy",
  auth("updateOwn", "profile"),
  KycDocumentUploader.fields([
    { name: "frontAdhar", maxCount: 1 },
    { name: "backAdhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
  ]),
  userController.saveManualKycFile
);
router.post(
  "/save-user-kyc-manualy",
  auth("updateOwn", "profile"),
  KycDocumentUploader.fields([
    { name: "frontAdhar", maxCount: 1 },
    { name: "backAdhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
  ]),
  userController.saveManualKycFile
);
router.get(
  "/get-user-kyc-status",
  auth("readOwn", "profile"),
  userController.getManualKycdocument
);
router.post(
  "/kyc-verify-pan-auto",
  auth("readOwn", "profile"),
  userController.kycPanVerification
);
router.post(
  "/kyc-verify-aadhar-auto-generate-otp",
  auth("readOwn", "profile"),
  userController.kycAadharGenerateOtp
);
router.post(
  "/kyc-verify-aadhar-auto-verify-otp",
  auth("readOwn", "profile"),
  userController.kycAadharVerificationOtp
);
router.post(
  "/kyc-verify-gst-auto",
  auth("readOwn", "profile"),
  userController.kycGStVerification
);

module.exports = router;
