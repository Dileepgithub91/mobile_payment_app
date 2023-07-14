const Validator = require("../validations/user.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  userServices,
  userProfileServices,
  userAddressServices,
  userKycDetailsServices,
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
    if (req.files) {
      AadharFront = req.files.frontAdhar[0].path;
      AadharBack = req.files.backAdhar[0].path;
      PanImage = req.files.pan[0].path;
    }
    AadharFront === "" && AadharBack === "" ? {} : kycLevel + 1;
    PanImage === "" ? {} : kycLevel + 1;
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
    const userId = req.params.userId; //req.user.user_id
    const userProfile = await userServices.getUserProfilebyUserID(userId);
    response.success(res, "User Profile Updated!", userProfile);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  updateUserProfile,
  getUserProfile,
  saveManualKycFile,
};
