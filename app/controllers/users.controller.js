const Validator = require("../validations/user.validate");
const { response } = require("../helpers");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const logger = require("../logger");
const {
  userService,
  userProfileService,
  userAddressService,
  userKycDetailsService,
  kycService ,
  walletService
} = require("../services");
const ErrorHandler = require("../helpers/error.handler");

const updateUserProfile = catchAsyncError(async (req, res, next) => {
    const bodyData = req.body;
    let imageUrl = "";
    const value = await Validator.saveUserProfile.validateAsync(bodyData);
    if (req.file) {
      imageUrl = req.file.path || "";
    }
    ///update user
    await userService.updateUser(
      {
        first_name: value.first_name,
        middle_name: value.middle_name,
        last_name: value.last_name,
        email: value.email,
        next_step:"kyc-verification"
      },
      req.user.id
    );
    ///create new user profile
    await userProfileService.addUserProfile({
      user_id: req.user.id,
      avtar: value.avtar || "",
      image_url: imageUrl,
      whatsapp_number: value.whatsapp_number,
      alternate_mobile: value.alternate_mobile,
      refferal_code: value.refferal_code,
    });
    ///create new user address
    await userAddressService.addUserAddress({
      user_id: req.user.id,
      address_type: "user_address",
      address_line_1: value.address_line_1,
      address_line_2: value.address_line_2,
      city_id: value.city_id,
      state_id: value.state_id,
      postcode: value.post_code,
    });
    //create Wallet of user
    await walletService.saveWallet({user_id:req.user.id});
    response.success(res, "User Profile Updated!");
});

const uploadUserProfileImage = catchAsyncError(async (req, res, next) => {
    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path || "";
    }else{
      throw new ErrorHandler("Upload is required",responseFlags.failure)
    }
    ///create new user profile
    await userProfileService.updateUserProfilebyUserID(
      {
        image_url: imageUrl,
      },
      req.user.id
    );
    response.success(res, "User Profile image Updated!");
});

const changeUserAvatar = catchAsyncError(async (req, res, next) => {
  const value = await Validator.updateUserProfileAvatar.validateAsync(req.body);
    ///create new user profile
    await userProfileService.updateUserProfilebyUserID(
      {
        avatar: value.avatar,
      },
      req.user.id
    );
    response.success(res, "User Avatar Updated!");
});

const saveManualKycFile = catchAsyncError(async (req, res, next) => {
    const checkKycStatus =
      await userKycDetailsService.getUserKycDetailsByUserId(req.user.id);
    if (checkKycStatus) {
      let checkDData = checkKycStatus.dataValues;
      if (
        checkDData.adhaar_kyc_status == "Verified" &&
        checkDData.pan_kyc_status == "Verified"
      ) {
        response.success(res, "User Kyc has already completed!!");
        return true;
      }
    }

    let AadharFront = "";
    let AadharBack = "";
    let PanImage = "";
    let kycLevel = null;
    let adhaarKycStatus = "null";
    let panKycStatus = "null";
    if (req.files) {
      AadharFront = req.files.frontAdhar[0].path;
      AadharBack = req.files.backAdhar[0].path;
      PanImage = req.files.pan[0].path;
    }
    AadharFront === "" && AadharBack === "" ? {} : (kycLevel = "1");
    AadharFront === "" && AadharBack === ""
      ? {}
      : (adhaarKycStatus = "pending");
    PanImage === "" ? {} : (kycLevel = "2");
    PanImage === "" ? {} : (panKycStatus = "pending");
    ///update user 
    await userService.updateUser(
      {
        next_step:"Home-Page",
      },
      req.user.id
    );
    ///update user profile
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: kycLevel,
      },
      req.user.id
    );
    ///update User Kyc files
    await userKycDetailsService.addUserKycDetails({
      user_id: req.user.id,
      adhaar_image_front: AadharFront,
      adhaar_image_back: AadharBack,
      pan_image: PanImage,
      adhaar_kyc_status: adhaarKycStatus,
      pan_kyc_status: panKycStatus,
      user_id:req.user.id
    });
    response.success(res, "User Profile Updated!");
});

const skipUserKyc = catchAsyncError(async (req, res, next) => {
    ///update user
    await userService.updateUser(
      {
        status: "Active",
        next_step:"Home-Page",
      },
      req.user.id
    );
    ///update user profile
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: "0",
      },
      req.user.id
    );
    ///update User Kyc files
    await userKycDetailsService.addUserKycDetails({
      user_id: req.user.id,
      adhaar_kyc_status: "notVerified",
      pan_kyc_status: "notVerified",
      user_id:req.user.id
    });
    response.success(res, "User Kyc Skiped!");
});

const getUserProfile =  catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const userProfile = await userProfileService.getUserProfilebyUserID(
      userId
    );
    const userLogin = await userService.getUserByUserId(userId);
    const user = { ...userLogin.user, ...userProfile.dataValues };
    response.success(res, "User Profile!", user);
});
const getManualKycdocument =  catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    let aadharKyc = {};
    let panKyc = {};
    let gstKyc = {};
    let Kycdata = await userKycDetailsService.getUserKycDetailsByUserId(
      userId
    );
    if (!Kycdata) {
      Kycdata={};
    }
    response.success(res, "User Kyc data retrived!", Kycdata);
});

const kycPanVerification = catchAsyncError(async (req, res, next) => {
    const checkKycStatus =
      await userKycDetailsService.getUserKycDetailsByUserId(req.user.id);
      if (checkKycStatus) {
        let checkDData = checkKycStatus.dataValues;
        if (
          checkDData.adhaar_kyc_status == "Verified" &&
          checkDData.pan_kyc_status == "Verified"
        ) {
          response.success(res, "User Kyc has already completed!!");
          return true;
        }
      }
    const { pan } = req.body;
    const panData = await kycService.verifyPan(pan);
    //update kyc document
    await userKycDetailsService.updateUserKycDetails(
      {
        pan_number: panData.data.pan_number,
        pan_kyc_status: "verified",
      },
      req.user.id
    );
    //update zip city and state
    await userAddressService.updateUserAddress(
      {
        postcode: panData.data.data.address.zip,
        state_id: panData.data.data.address.state,
      },
      req.user.id
    );
     ///update user
     await userService.updateUser(
      {
        status: "Active",
        next_step:"Home-Page",
      },
      req.user.id
    );
    //update kyc level
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: "2",
        signup_completed:"true",
      },
      req.user.id
    );
    const kycdata = panData.data.data;
    kycdata.user_id = req.user.id;
    //save pan responce
    const verifydata = await kycService.SavePanVerificationData(kycdata);
    response.success(res, "User Kyc Pan Verification Successfull!");
});

const kycAadharGenerateOtp =  catchAsyncError(async (req, res, next) => {
    const checkKycStatus =
      await userKycDetailsService.getUserKycDetailsByUserId(req.user.id);
      if (checkKycStatus) {
        let checkDData = checkKycStatus.dataValues;
        if (
          checkDData.adhaar_kyc_status == "Verified" &&
          checkDData.pan_kyc_status == "Verified"
        ) {
          response.success(res, "User Kyc has already completed!!");
          return true;
        }
      }
    const { aadharNo } = req.body;
    const aadharData = await kycService.generateAadharOtp(aadharNo);
    response.success(
      res,
      "Otp for aadhar verification has been sent!",
      aadharData.data
    );
});

const kycAadharVerificationOtp =  catchAsyncError(async (req, res, next) => {
    const { clientId, otp } = req.body;
    const aadharData = await kycService.VerifyAadharOtp(clientId, otp);
    //update kyc document // adhaar_attachmented_number
    await userKycDetailsService.updateUserKycDetails(
      {
        adhaar_number: aadharData.data.aadhaar_number,
        adhaar_kyc_status: "verified",
      },
      req.user.id
    );
    //update zip city and state
    await userAddressService.updateUserAddress(
      {
        state_id: aadharData.data.data.address.state,
        city_id: aadharData.data.data.address.dist,
      },
      req.user.id
    );
     ///update user
     await userService.updateUser(
      {
        status: "Active",
        next_step:"kyc-verification",
      },
      req.user.id
    );
    //update kyc level
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: "1",
        signup_completed:"true",
      },
      req.user.id
    );
    const verifyData = aadharData.data.data;
    verifyData.user_id = req.user.id;
    //save pan responce
    await kycService.SaveAadharVerificationData(verifyData);
    response.success(res, "Aadhar Verification Successfull!");
});

const kycGStVerification = catchAsyncError( async (req, res, next) => {
    const checkKycStatus =
      await userKycDetailsService.getUserKycDetailsByUserId(req.user.id);
      if (checkKycStatus) {
        let checkDData = checkKycStatus.dataValues;
        if (
          checkDData.adhaar_kyc_status == "Verified" &&
          checkDData.pan_kyc_status == "Verified"
        ) {
          response.success(res, "User Kyc has already completed!!");
          return true;
        }
      }
    const { gstNo } = req.body;
    const gstData = await kycService.verifyGst(gstNo);
    if (gstData.data.gstin_status != "Active") {
      throw new ErrorHandler(responseMessages.gstInactive,responseFlags.failure);
    }
    //update kyc document
    await userKycDetailsService.updateUserKycDetails(
      {
        gst_number: gstData.data.gstin,
        gst_state: gstData.data.gstin_status,
        gst_state_code: gstData.data.state_jurisdiction,
        gst_kyc_status: "verified",
      },
      req.user.id
    );
     ///update user
     await userService.updateUser(
      {
        status: "Active",
        next_step:"kyc-verification",
      },
      req.user.id
    );
    //update kyc level
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: "3",
        signup_completed:"true",
        bussiness_name: gstData.data.business_name,
      },
      req.user.id
    );
    //save pan responce
    await kycService.SaveGSTVerificationData(gstData.data);
    response.success(res, "User Kyc Gst Verification Successfull!");
});

module.exports = {
  updateUserProfile,
  uploadUserProfileImage,
  changeUserAvatar,
  getUserProfile,
  skipUserKyc,
  saveManualKycFile,
  getManualKycdocument,
  kycPanVerification,
  kycGStVerification,
  kycAadharGenerateOtp,
  kycAadharVerificationOtp,
};
