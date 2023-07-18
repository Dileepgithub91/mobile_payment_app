const {businessCustomerValidator,otpVerificationValidator} = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  businessCustomerServices,
  authServices
} = require("../services");

const addNewBusinessCustomerrequest = async (req, res, next) => {
  try {
    const bodyData = req.body;
    //validator
    const value = await businessCustomerValidator.saveNewCustomerRequest.validateAsync(bodyData);
    ///update user
    const customer= await businessCustomerServices.addBusinessCustomerRequest(value);

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
// get business customer user profile
// download link agreement 
//upload agreement document


module.exports = {
  addNewBusinessCustomerrequest,
  verifyBusinessCustomerrequest
};
