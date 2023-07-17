const Validator = require("../validations/user.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  userServices,
  userProfileServices,
  userAddressServices,
  userKycDetailsServices,
  kycService,
} = require("../services");

const updateUserProfile = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const imageUrl = "";
    const value = await Validator.saveUserProfile.validateAsync(bodyData);
    if (req.file) {
      imageUrl = req.file.path || "";
    }
    ///update user
    await userServices.updateUser(
      {
        first_name: value.firstname,
        middle_name: value.middlename,
        last_name: value.lastname,
        email: value.email,
      },
      req.user.user_id
    );
    ///create new user profile
    await userProfileServices.addUserProfile({
      user_id: req.user.user_id,
      avtar: value.avtar || "",
      image_url: imageUrl,
      whatsapp_number: value.whatsappNumber,
      alternate_mobile: value.alternateMobile,
      refferal_code: value.refferalCode,
    });
    ///create new user address
    await userAddressServices.addUserAddress({
      user_id: "req.user.user_id",
      address_type: "user_address",
      address_line_1: value.addressLine1,
      address_line_2: value.addressLine2,
      city_id: value.cityId,
      state_id: value.stateId,
      postcode: value.postcode,
    });
    response.success(res, "User Profile Updated!");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const saveManualKycFile = async (req, res, next) => {
  try {
    let AadharFront = "";
    let AadharBack = "";
    let PanImage = "";
    let kycLevel = 1;
    let adhaarKycStatus = "null";
    let panKycStatus = "null";
    if (req.files) {
      AadharFront = req.files.frontAdhar[0].path;
      AadharBack = req.files.backAdhar[0].path;
      PanImage = req.files.pan[0].path;
    }
    AadharFront === "" && AadharBack === "" ? {} : kycLevel + 1;
    AadharFront === "" && AadharBack === ""
      ? {}
      : (adhaarKycStatus = "pending");
    PanImage === "" ? {} : kycLevel + 1;
    PanImage === "" ? {} : (panKycStatus = "pending");
    ///update user profile
    await userProfileServices.updateUser(
      {
        kyc_level: kycLevel,
      },
      req.user.user_id
    );
    ///update User Kyc files
    await userKycDetailsServices.addUserKycDetails({
      adhaar_image_front: AadharFront,
      adhaar_image_back: AadharBack,
      pan_image: PanImage,
      adhaar_kyc_status: adhaarKycStatus,
      pan_kyc_status: panKycStatus,
    });
    response.success(res, "User Profile Updated!");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const userProfile = await userProfileServices.getUserProfilebyUserID(
      userId
    );
    response.success(res, "User Profile Updated!", userProfile);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getManualKycdocument = async (req, res, next) => {
  try {
    const userId = req.params.userId; //req.user.user_id
    const userKyc = await userKycDetailsServices.getUserKycDetailsByUserId(
      userId
    );
    response.success(res, "User Kyc data retrived!", userKyc);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const kycPanVerification = async (req, res, next) => {
  try {
    const { pan } = req.body;
    const panData = await kycService.verifyPan(pan);
    //update kyc document
    await userKycDetailsServices.updateUserKycDetails(
      {
        pan_number: panData.data.pan_number,
        pan_kyc_status: "verified",
      },
      req.user.user_id
    );
    //update zip city and state
    await userAddressServices.updateUserAddress(
      {
        postcode: panData.data.address.zip,
        state_id: panData.data.address.state,
      },
      req.user.user_id
    );
    //update user profile Services
    const userProfile = await userProfileServices.getUserProfilebyUserID(
      req.user.user_id
    );
    const kycLevel = parseInt(userProfile.kyc_level) + 1;
    //update kyc level
    await userProfileServices.updateUserProfilebyUserID(
      {
        kyc_level: kycLevel,
      },
      req.user.user_id
    );
    response.success(res, "User Kyc Pan Verification Successfull!");
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const kycAadharGenerateOtp = async (req, res, next) => {
  try {
    const { aadharNo } = req.body;
    const aadharData = await kycService.generateAadharOtp(aadharNo);
    response.success(res, "Otp for aadhar verification has been sent!",aadharData.data);
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const kycAadharVerificationOtp = async (req, res, next) => {
  try {
    const { clientId,otp } = req.body;
    const aadharData = await kycService.VerifyAadharOtp(clientId,otp);
    //update kyc document // adhaar_attachmented_number
    await userKycDetailsServices.updateUserKycDetails(
      {
        adhaar_number: aadharData.data.aadhaar_number,
        adhaar_kyc_status: "verified",
      },
      req.user.user_id
    );
    //update zip city and state
    await userAddressServices.updateUserAddress(
      {
        state_id: aadharData.data.address.state,
        city_id :aadharData.data.address.dist

      },
      req.user.user_id
    );
    //update user profile Services
    const userProfile = await userProfileServices.getUserProfilebyUserID(
      req.user.user_id
    );
    const kycLevel = parseInt(userProfile.kyc_level) + 1;
    //update kyc level
    await userProfileServices.updateUserProfilebyUserID(
      {
        kyc_level: kycLevel,
      },
      req.user.user_id
    );
    response.success(res, "User Kyc Gst Verification Successfull!");
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const kycGStVerification = async (req, res, next) => {
  try {
    const { gstNo } = req.body;
    const gstData = await kycService.verifyGst(gstNo);
    if(gstData.data.gstin_status!="Active"){
      throw new Error("Gst is Inactive, gst verification failed!")
    }
    //update kyc document
    await userKycDetailsServices.updateUserKycDetails(
      {
        gst_number: gstData.data.gstin,
        gst_state:gstData.data.gstin_status,
        gst_state_code:gstData.data.state_jurisdiction,
        gst_kyc_status: "verified",
      },
      req.user.user_id
    );
    //update user profile Services
    const userProfile = await userProfileServices.getUserProfilebyUserID(
      req.user.user_id
    );
    const kycLevel = parseInt(userProfile.kyc_level) + 1;
    //update kyc level
    await userProfileServices.updateUserProfilebyUserID(
      {
        kyc_level: kycLevel,
        bussiness_name:gstData.data.business_name
      },
      req.user.user_id
    );
    response.success(res, "User Kyc Gst Verification Successfull!");
  } catch (error) {
    logger.log("info", error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  updateUserProfile,
  getUserProfile,
  saveManualKycFile,
  getManualKycdocument,
  kycPanVerification,
  kycGStVerification,
  kycAadharGenerateOtp,
  kycAadharVerificationOtp
};
