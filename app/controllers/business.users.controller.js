const {responseMessages,responseFlags} = require("../core/constants");
const moment = require("moment");
const catchAsyncError=require('../middleware/catch.async.error');
const {
  businessCustomerValidator,
  otpVerificationValidator,
} = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  businessUserService,
  authService,
  userAddressService,
  userService,
  userProfileService,
  userKycDetailsService,
  dataGenService,
  emailService
} = require("../services");
const ErrorHandler = require("../helpers/error.handler");

///Business request authrisation starts here
const addBusinessUserRequest = catchAsyncError(async (req, res, next) => {
    const bodyData = req.body;
    //validator
    const value =
      await businessCustomerValidator.saveNewCustomerRequest.validateAsync(
        bodyData
      );
    ///update user
    const customer = await businessUserService.addBusinessUserRequest({
      first_name: value.firstName,
      last_name: value.lastName,
      mobile_no: value.mobileNo,
      email: value.email,
      zip_code: value.zipCode,
      services: value.services,
      business_name: value.businessName,
    });

    //add new opt from register otp:
    const registeredUser = await authService.addRegistrationUser({
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
});

const resendBusinessUserRequestOtp = catchAsyncError(async (req, res, next) => {
    const { mobile_no } = req.body;
    ///validate input
    const value =
      await otpVerificationValidator.registerOtp.validateAsync({
        mobile_no: mobile_no
      });
    //verify otp
    const businessRequset= await businessUserService.getBusinessUserRequest(value.mobile_no);

    if(!businessRequset){
      throw new ErrorHandler(responseMessages.businessRequestNotFound,responseFlags.notFound);
    }
    if(businessRequset.status ==="Verified"){
      throw new ErrorHandler(responseMessages.businessRequestVerifiedError,responseFlags.failure);
    }
     //add new opt from register otp:
     const registeredUser = await authService.addRegistrationUser({
      mobileNo: value.mobile_no,
      verificationType:"business"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobile_no, registeredUser.otp);
   
    response.success(
      res,
      "Business Request otp resent!",
      registeredUser
    );
});

const verifyBusinessUserRequest = catchAsyncError(async (req, res, next) => {
    const { mobile_no, otp } = req.body;
    ///validate input
    const value =
      await otpVerificationValidator.registerOtpVerify.validateAsync({
        mobile_no: mobile_no,
        otp: otp,
      });
    //verify otp
    const regesteredUser = await authService.findRegistrationUser({mobile_no:mobile_no,verification_type:"business"});
    const updatedRetriesValue = parseInt(regesteredUser.no_of_retries) + 1;
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue >= 3) {
      throw new ErrorHandler(responseMessages.otpTryExceded,responseFlags.failure);
    }
    //check as the otp must be generated within 5 min
    const endDate = moment(new Date());
    const startDate = moment(regesteredUser.updatedAt);
    const diffInMinutes = endDate.diff(startDate, "minutes");
    if (diffInMinutes >5) {
      logger.log(
        "info",
        "You Otp  has Expired, please resend new otp!"
      );
      throw new ErrorHandler(responseMessages.otpExpired,responseFlags.failure);
    }
  //check if the otp is correct
  if (regesteredUser.otp !== otp) {
    await authService.updateRegistrationUser(
      { no_of_retries: updatedRetriesValue },
      {id:regesteredUser.id, verification_type:"business"}
    );
    throw new ErrorHandler(responseMessages.otpInvalid,responseFlags.failure);
  }
    ///update business request
    const customer = await businessUserService.addBusinessUserRequest({
      mobile_no: value.mobile_no,
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
});
///request autherisation ends here
// save business customer user profile
const saveBusinessUserProfile = catchAsyncError(async (req, res, next) => {
    const bodyData = req.body;
    const UserID = req.user.id;
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
    await userService.updateUser(
      {
        first_name: value.firstname,
        middle_name: value.middlename,
        last_name: value.lastname,
        email: value.email,
        next_step:"update-shop-details",
      },
      req.user.id
    );
    ///create new user profile
    await userProfileService.addUserProfile({
      user_id: req.user.id,
      avtar: value.avtar || "",
      image_url: imageUrl,
      whatsapp_number: value.whatsappNumber,
      alternate_mobile: value.alternateMobile,
    });
    ///create new user address
    await userAddressService.addUserAddress({
      user_id: req.user.id,
      address_type: "user_address",
      address_line_1: value.addressLine1,
      address_line_2: value.addressLine2,
      city_id: value.cityId,
      state_id: value.stateId,
      postcode: value.postcode,
    });
    // get business request data
    const businessRequestData =
      await businessUserService.addBusinessUserRequest(
        {mobile_no:req.user.mobile_no}
      );
    ////Get all business agreement by company type
    const businessAgreement =
      await businessUserService.getBusinessAgreement(
        businessRequestData.company_type
      );
    ///Update Comapny agreement document
    businessAgreement.forEach((aggrement) => {
      businessUserService.uploadBusinessAgreementDocument({
        user_id: UserID,
        agreement_document_id: aggrement.id,
        uploaded_agreement_document: null,
      });
    });

    response.success(
      res,
      "Your Business Customer Profile has been Updated!"
    );
});
// save business customer shop profile
const saveBusinessUserShopDetails = catchAsyncError(async (req, res, next) => {
    const bodyData = req.body;
    let imageUrl = "";
    //validator
    const value =
      await businessCustomerValidator.saveCustomerShopDetails.validateAsync(
        bodyData
      );
    if (req.file) {
      imageUrl = req.file.path || "";
    }
    ///update user
    await userService.updateUser(
      {
        next_step:"kyc-verification",
      },
      req.user.id
    );
    ///create new user profile
    await userProfileService.addUserProfile({
      user_id: req.user.id,
      bussiness_name: value.businessName,
      bussiness_card: imageUrl,
      whatsapp_number: value.whatsappNumber,
      bussiness_email: value.businessEmail,
      bussiness_yearly_turnover: value.yearlyTurnOver,
      bussiness_monthaly_turnover: value.monthalyTurnOver,
      bussiness_alternate_mobile: value.alternateMobile,
    });
    ///create new user address
    await userAddressService.addUserAddress({
      user_id: req.user.id,
      address_type: "business_address",
      address_line_1: value.businessAddress,
      postcode: value.businessZipCode,
    });

    response.success(
      res,
      "Your Business Customer Shop Details has been Updated!"
    );
});
// get business customer user profile
const getBusinessUserProfile = catchAsyncError(async (req, res, next) => {
    const customer = await userProfileService.getUserProfilebyUserID(
      req.user.id
    );
    response.success(res, "Your Business Customer Profile!", customer);
});

//Skip Business Customer Kyc
const skipBusinessUserKyc = catchAsyncError(async (req, res, next) => {
    ///update user
    await userService.updateUser(
      {
        status: 1,    
        next_step:"Home-page",
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
      adhaar_kyc_status: "notVerified",
      pan_kyc_status: "notVerified",
      gst_kyc_status: "notVerified",
      user_id:req.user.id
    });
    response.success(res, "User Kyc Skiped!");
});

//Save Manual Kyc
const saveManualKycFile = catchAsyncError(async (req, res, next) => {
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
    await userProfileService.updateUserProfilebyUserID(
      {
        kyc_level: kycLevel,
      },
      req.user.id
    );
    ///update User Kyc files
    await userKycDetailsService.addUserKycDetails({
      adhaar_image_front: AadharFront,
      adhaar_image_back: AadharBack,
      pan_image: PanImage,
      adhaar_kyc_status: adhaarKycStatus,
      pan_kyc_status: panKycStatus,
      user_id:req.user.id
    });
    response.success(res, "User Profile Updated!");
});
// download link agreement 
const getBusinessUserAgreement = catchAsyncError(async (req, res, next) => {
    const customer = await businessUserService.getUploadedBusinessAgreementDocument(
      req.user.id
    );
    response.success(res, "Your Business Agreement Documents!", customer);
});
//upload agreement document
const uploadBusinessUserAgreement = catchAsyncError(async (req, res, next) => {
    let uploadedAgreementDocument = "";
    const value = await businessCustomerValidator.uploadBusinessAgreement.validateAsync(
      {
        agreementDocumentId:req.body.agreementDocumentId
      }
    );
    if (req.files) {
      uploadedAgreementDocument = req.files.agreementDocument[0].path;
    }
    const customer = await businessUserService.uploadBusinessAgreementDocument(
      {
        user_id:req.user.id,
        agreement_document_id:value.agreementDocumentId,
        uploaded_agreement_document:uploadedAgreementDocument,
        status:"pending"
      }
    );
    
    response.success(res, "Your Business Agreement Documents!", customer);
});

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
