const express = require("express");
const passport =require("passport");
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
  passport.authenticate("jwt",{session:false}),
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
router.get(
  "/get-user-kyc-status",
  auth("readOwn", "profile"),
  userController.getManualKycdocument
);

module.exports = router;
