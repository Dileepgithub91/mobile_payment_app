const {businessCustomerValidator,otpVerificationValidator} = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  businessCustomerServices,
  authServices,
  userAddressServices,
  userServices,
  userProfileServices,
  userKycDetailsServices
} = require("../services");

const addNewBusinessCustomerrequest = async (req, res, next) => {
  try {
    const bodyData = req.body;
    //validator
    const value = await businessCustomerValidator.saveNewCustomerRequest.validateAsync(bodyData);
    ///update user
    const customer= await businessCustomerServices.addBusinessCustomerRequest({
      first_name:firstName,
      middle_name:middleName,
      last_name:lastName,
      request_type:requestType,
      mobile_no:mobileNo,
      address_line_1:addressLine1,
      address_line_2:addressLine2,
      state:state,
      city:city,
      zip_code:zipCode,
      services:services,
      business_name:businessName,
      company_type: businessType,
      business_address_1:businessAddress1,
      business_address_2:businessAddress2,
      monthaly_turn_over:monthalyTurnOver
    });

    //add new opt from register otp:
    const registeredUser = await authServices.addRegistrationUser({
      mobileNo: value.mobileNo,
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    
    response.success(res, "Your otp to verify business request has been sent!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const verifyBusinessCustomerrequest = async (req, res, next) => {
  try {
    const {mobileNo,otp} =req.body;
     ///validate input
     const value = await otpVerificationValidator.register_otp_verify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
    //verify otp 
    const regesteredUser =await authServices.verifyRegistrationotp(value);
    if(!regesteredUser){
      response.generalError(res, "Otp verification failed");
      return false;
    }
    ///update business request
    const customer= await businessCustomerServices.addBusinessCustomerRequest({mobileNo:value.mobileNo,status:"Verified"});
    response.success(res, "Business Customer Service Request Submitted!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

// save business customer user profile
const saveBusinessCustomerprofile = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const imageUrl = "";
   //validator
   const value = await businessCustomerValidator.saveCustomerProfile.validateAsync(bodyData);
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
  });
  ///create new user address
  await userAddressServices.addUserAddress({
    user_id: req.user.user_id,
    address_type: "user_address",
    address_line_1: value.addressLine1,
    address_line_2: value.addressLine2,
    city_id: value.cityId,
    state_id: value.stateId,
    postcode: value.postcode,
  });

  ///Update Comapny agreement document
    
    response.success(res, "Your Business Customer Profile has been Updated!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
// save business customer shop profile
const saveBusinessCustomerShopDetails = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const imageUrl = "";
   //validator
   const value = await businessCustomerValidator.saveCustomerProfile.validateAsync(bodyData);
    if (req.file) {
      imageUrl = req.file.path || "";
    }
  ///create new user profile
  await userProfileServices.addUserProfile({
    user_id: req.user.user_id,
    bussiness_name: value.businessName,
    bussiness_card: imageUrl,
    whatsapp_number: value.whatsappNumber,
    bussiness_email:value.businessEmail,
    bussiness_yearly_turnover:value.yearlyTurnOver,
    bussiness_monthaly_turnover:value.monthalyTurnOver,
    bussiness_alternate_mobile: value.alternateMobile,
  });
  ///create new user address
  await userAddressServices.addUserAddress({
    user_id: req.user.user_id,
    address_type: "business_address",
    address_line_1: value.businessAddress,
    postcode: value.businessZipCode,
  });
    
    response.success(res, "Your Business Customer Shop Details has been Updated!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
// get business customer user profile
const getBusinessCustomerProfile = async (req, res, next) => {
  try {
   const customer=await  userProfileServices.getUserProfilebyUserID(req.user.user_id);
    response.success(res, "Your Business Customer Profile!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

//Skip Business Customer Kyc
const skipBusinessCustomerKyc = async (req, res, next) => {
  try {
     ///update user
     await userServices.updateUser(
      {
       status:"Active"
      },
      req.user.user_id
    );
    ///update user profile
    await userProfileServices.updateUser(
      {
        kyc_level: "0",
      },
      req.user.user_id
    );
    ///update User Kyc files
    await userKycDetailsServices.addUserKycDetails({
      adhaar_kyc_status: "notVerified",
      pan_kyc_status: "notVerified",
      gst_kyc_status: "notVerified",
    });
    response.success(res, "User Kyc Skiped!");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

//Save Manual Kyc
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
// download link agreement 

//upload agreement document


module.exports = {
  addNewBusinessCustomerrequest,
  verifyBusinessCustomerrequest,
  saveBusinessCustomerprofile,
  saveBusinessCustomerShopDetails,
  getBusinessCustomerProfile,
  skipBusinessCustomerKyc,
  saveManualKycFile
};
