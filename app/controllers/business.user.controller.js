const {
  businessCustomerValidator,
  otpVerificationValidator,
} = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  businessUserServices,
  authServices,
  userAddressServices,
  userServices,
  userProfileServices,
  userKycDetailsServices,
  dataGenService,
  emailService
} = require("../services");

///Business request authrisation starts here
const addBusinessUserRequest = async (req, res, next) => {
  try {
    const bodyData = req.body;
    //validator
    const value =
      await businessCustomerValidator.saveNewCustomerRequest.validateAsync(
        bodyData
      );
    ///update user
    const customer = await businessUserServices.addBusinessCustomerRequest({
      first_name: value.firstName,
      last_name: value.lastName,
      mobile_no: value.mobileNo,
      email: value.email,
      zip_code: value.zipCode,
      services: value.services,
      business_name: value.businessName,
    });

    //add new opt from register otp:
    const registeredUser = await authServices.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"business"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);

    response.success(
      res,
      "Your otp to verify business request has been sent!",
      {...customer,...registeredUser},
      
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const resendBusinessUserRequestOtp = async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    ///validate input
    const value =
      await otpVerificationValidator.register_otp.validateAsync({
        mobileNo: mobileNo
      });
    //verify otp
    const businessRequset= await businessUserServices.getBusinessCustomerRequest(mobileNo);

    if(!businessRequset){
      logger.log("info", "Business Request not found!");
      response.validatationError(res, "Business Request not found!");
      return false;
    }
    if(businessRequset.status ==="Verified"){
      logger.log("info", "Business Request is already verified!");
      response.validatationError(res, "Business Request is already verified!");
      return false;
    }
     //add new opt from register otp:
     const registeredUser = await authServices.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"business"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
   
    response.success(
      res,
      "Business Request otp resent!",
      registeredUser
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const verifyBusinessUserRequest = async (req, res, next) => {
  try {
    const { mobileNo, otp } = req.body;
    ///validate input
    const value =
      await otpVerificationValidator.register_otp_verify.validateAsync({
        mobileNo: mobileNo,
        otp: otp,
      });
    //verify otp
    const regesteredUser = await authServices.findRegistrationUser({mobile_no:mobileNo,verification_type:"business"});
    const updatedRetriesValue = parseInt(regesteredUser.no_of_retries) + 1;
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue >= 3) {
      logger.log(
        "info",
        "You have exceeded no of tries for otp,you can resend otp"
      );
      response.validatationError(res, "You have exceeded no of tries for otp,you can resend otp.");
      return false;
    }
  //check if the otp is correct
  if (regesteredUser.otp !== otp) {
    await authServices.updateRegistrationUser(
      { no_of_retries: updatedRetriesValue },
      {id:regesteredUser.id, verification_type:"business"}
    );
    logger.log("info", "Invalid Otp!, enter correct otp.");
    response.validatationError(res, "Invalid Otp!, enter correct otp.");
    return false;
  }
    ///update business request
    const customer = await businessUserServices.addBusinessCustomerRequest({
      mobile_no: value.mobileNo,
      status: "Verified",
    });
    customer.status="Verified";
  
    /// send mail about successfull business requset
    let mailBody=`Your Business Request with mobile number ${customer.mobile_no} and email ${customer.email} has been submitted successfully.
    please wait till your request is approved, you will receive mail with your credentials`;
    emailService.sentEmail(customer.email,"Business Request Submitted Successfully",mailBody)
    response.success(
      res,
      "Business Customer Service Request Submitted!",
      customer
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
///request autherisation ends here
// save business customer user profile
const saveBusinessUserProfile = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const UserID = req.user.user_id;
    let imageUrl = "";
    //validator
    const value =
      await businessCustomerValidator.saveCustomerProfile.validateAsync(
        bodyData
      );
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
    // get business request data
    const businessRequestData =
      await businessUserServices.getBusinessCustomerRequest(
        req.user.mobile_no
      );
    ////Get all business agreement by company type
    const businessAgreement =
      await businessUserServices.getBusinessAgreement(
        businessRequestData.company_type
      );
    ///Update Comapny agreement document
    businessAgreement.forEach((aggrement) => {
      businessUserServices.uploadBusinessAgreementDocument({
        user_id: UserID,
        agreement_document_id: aggrement.id,
        uploaded_agreement_document: null,
      });
    });

    response.success(
      res,
      "Your Business Customer Profile has been Updated!",
      customer
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
// save business customer shop profile
const saveBusinessUserShopDetails = async (req, res, next) => {
  try {
    const bodyData = req.body;
    let imageUrl = "";
    //validator
    const value =
      await businessCustomerValidator.saveCustomerProfile.validateAsync(
        bodyData
      );
    if (req.file) {
      imageUrl = req.file.path || "";
    }
    ///create new user profile
    await userProfileServices.addUserProfile({
      user_id: req.user.user_id,
      bussiness_name: value.businessName,
      bussiness_card: imageUrl,
      whatsapp_number: value.whatsappNumber,
      bussiness_email: value.businessEmail,
      bussiness_yearly_turnover: value.yearlyTurnOver,
      bussiness_monthaly_turnover: value.monthalyTurnOver,
      bussiness_alternate_mobile: value.alternateMobile,
    });
    ///create new user address
    await userAddressServices.addUserAddress({
      user_id: req.user.user_id,
      address_type: "business_address",
      address_line_1: value.businessAddress,
      postcode: value.businessZipCode,
    });

    response.success(
      res,
      "Your Business Customer Shop Details has been Updated!",
      customer
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
// get business customer user profile
const getBusinessUserProfile = async (req, res, next) => {
  try {
    const customer = await userProfileServices.getUserProfilebyUserID(
      req.user.user_id
    );
    response.success(res, "Your Business Customer Profile!", customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

//Skip Business Customer Kyc
const skipBusinessUserKyc = async (req, res, next) => {
  try {
    ///update user
    await userServices.updateUser(
      {
        status: "Active",
      },
      req.user.user_id
    );
    ///update user profile
    await userProfileServices.updateUserProfilebyUserID(
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
    await userProfileServices.updateUserProfilebyUserID(
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
const getBusinessUserAgreement = async (req, res, next) => {
  try {
    const customer = await businessUserServices.getUploadedBusinessAgreementDocument(
      req.user.user_id
    );
    response.success(res, "Your Business Agreement Documents!", customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
//upload agreement document
const uploadBusinessUserAgreement = async (req, res, next) => {
  try {
    let uploadedAgreementDocument = "";
    const value = await businessCustomerValidator.uploadBusinessAgreement.validateAsync(
      {
        agreementDocumentId:req.body.agreementDocumentId
      }
    );
    if (req.files) {
      uploadedAgreementDocument = req.files.agreementDocument[0].path;
    }
    const customer = await businessUserServices.uploadBusinessAgreementDocument(
      {
        user_id:req.user.user_id,
        agreement_document_id:value.agreementDocumentId,
        uploaded_agreement_document:uploadedAgreementDocument,
        status:"pending"
      }
    );
    
    response.success(res, "Your Business Agreement Documents!", customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  addBusinessUserRequest,
  resendBusinessUserRequestOtp,
  verifyBusinessUserRequest,
  saveBusinessUserProfile,
  saveBusinessUserShopDetails,
  getBusinessUserProfile,
  skipBusinessUserKyc,
  saveManualKycFile,
  getBusinessUserAgreement,
  uploadBusinessUserAgreement
};
