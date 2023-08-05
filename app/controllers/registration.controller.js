const bcrypt = require("bcrypt");
const Validator = require("../validations/otpverify.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const {responseMessages,responseFlags} = require("../core/constants");
const HelperFunction = require("../helpers/functions");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/errorhandler');
const {
  authService,
  userService,
  userTokenService,
  dataGenService
} = require("../services");

const getRegisterOtp = catchAsyncError(async (req, res, next) => {
    const { mobileNo } = req.body;
    const value = await Validator.registerOtp.validateAsync({
      mobileNo: mobileNo,
    });
    const registeredUser = await authService.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"register"
    });
    // //api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent",registeredUser);
});

const verifyRegisterOtp =  catchAsyncError(async (req, res, next) => {
    const { mobileNo, otp, deviceType, ipAddress } = req.body;
    const now = new Date().toISOString();
    ///validate input
    const value = await Validator.registerOtpVerify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
  //check if user Exists
  const userExist =await userService.getUserByMobile(value.mobileNo);
    if(userExist){
      response.success(res, responseMessages.userAlreadyExist ,userExist);
      return true;
    }
    ///find registered user
    const registeredUser = await authService.findRegistrationUser({
      mobile_no: value.mobileNo,
      verification_type:"register"
    });
    if(!registeredUser){
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // response.validatationError(res, "Registration does not Exists!");
    }
    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue > 3) {
      logger.log(
        "info",
        "You have exceeded no of tries for otp,you can resend otp!"
      );
      return next(new ErrorHandler(responseMessages.otpTryExceded, responseFlags.forbidden));
      // response.validatationError(res, "You have exceeded no of tries for otp,you can resend otp");
      // return false;
    }
    //check if the otp is correct
    if (registeredUser.otp !== otp) {
      await authService.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        {id:registeredUser.id, verification_type:"register"}
      );
      logger.log("info", "Invalid Otp!, enter correct otp.");
      return next(new ErrorHandler(responseMessages.otpInvalid, responseFlags.forbidden));
      // response.validatationError(res, "Invalid Otp!, enter correct otp.");
      // return false;
    }
    
    ///in case all ok update current step so when login goes to user profile
    await authService.updateRegistrationUser(
      { current_step: "user-profile" },
      {id:registeredUser.id, verification_type:"register"}
    );
    //generate 8 length
    const password = await HelperFunction.generateStrongPassword(8);
    console.log(`password ${password}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    //add new user
    const user = await userService.addUser({
      first_name: "guest",
      last_name: "user",
      mobile_no: value.mobileNo,
      password: hashedPassword,
    });
    //generate token
    const token = await HelperFunction.genAuthToken(
      user.user_id,
      deviceType,
      ipAddress
    );
    await userTokenService.addUserToken({
      user_id: user.user_id,
      token: token,
    });
    response.success(res, "User Registered Successfully!", { user, token ,password});
});

const getResendOtp = catchAsyncError(async (req, res, next) => {
    const { mobileNo } = req.body;
    const value = await Validator.registerOtp.validateAsync({
      mobileNo: mobileNo,
    });
    const user = await authService.findRegistrationUser({
      mobile_no: value.mobileNo,
      verification_Type:"register"
    });
    if (!user) {
      logger.log("info", "User Not Found");
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // response.generalError(res, "User Not Found");
      // return false;
    }
   const registeredUser =await authService.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"register"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent",registeredUser);
});

const sendForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const value = await Validator.registerOtp.validateAsync({
      mobileNo: mobileNo,
    });

    const user = await userService.getUserByMobile(value.mobileNo);
    if (!user) {
      logger.log("info", "User Not Found");
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // response.generalError(res, "User Not Found");
      // return false;
    }
    const registeredUser =await authService.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"forget"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent",registeredUser);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

const reSendForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const value = await Validator.registerOtp.validateAsync({
      mobileNo: mobileNo,
    });

    const user = await authService.findRegistrationUser({mobile_no:value.mobileNo,verification_type:"forget"});
    if (!user) {
      logger.log("info", "User Not Found");
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // response.generalError(res, "User Not Found");
      // return false;
    }
    const registeredUser =await authService.addRegistrationUser({
      mobileNo: value.mobileNo,
      verificationType:"forget"
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent",registeredUser);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

const verifyForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  try {
    const { mobileNo, otp } = req.body;
    const now = new Date().toISOString();
    ///validate input
    const value = await Validator.registerOtpVerify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
    ///find user
    const registeredUser = await authService.findRegistrationUser({
      mobile_no: value.mobileNo,
      verification_type:"forget"
    });

    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
      //check if the user has not exceeded otp limit i.e. 3
      if (updatedRetriesValue >= 3) {
        logger.log(
          "info",
          "You have exceeded no of tries for otp,you can resend otp"
        );
        return next(new ErrorHandler(responseMessages.otpTryExceded, responseFlags.forbidden));
        // response.validatationError(res, "You have exceeded no of tries for otp,you can resend otp.");
        // return false;
      }
    //check if the otp is correct
    if (registeredUser.otp !== otp) {
      await authService.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        {id:registeredUser.id, verification_type:"forget"}
      );
      logger.log("info", "Invalid Otp!, enter correct otp.");
      return next(new ErrorHandler(responseMessages.otpInvalid, responseFlags.forbidden));
      // response.validatationError(res, "Invalid Otp!, enter correct otp.");
      // return false;
    }
  
    //Sent email for change password
    response.success(
      res,
      "A email for change password has been sent to your registered email!",
      { registeredUser }
    );
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

const forgetPasswordChangePassword = catchAsyncError(async (req, res, next) => {
  try {
    const { mobileNo, newPassword, confirmPassword } = req.body;
    const value =
      await Validator.validateChangePassword.validateAsync(
        req.body
      );
    const hashedPassword = await bcrypt.hash(value.newPassword, 10);
    const findUser= await userService.getUserByMobile(mobileNo);
    if(!findUser){
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // throw new Error("User Not found");
    }
    const user = await userService.updateUser(
      {
        password: hashedPassword,
      },
      findUser.user_id
    );
    response.success(res, "User Password Changed Successfully!", user);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

const loginViaPassowrd = catchAsyncError(async (req, res, next) => {
  try {
    const { mobileNo, password, deviceType, ipAddress } = req.body;
    const value = await Validator.userLogin.validateAsync({
      mobileNo: mobileNo,
      password: password,
    });
    const user = await userService.getUserByMobile(value.mobileNo);
    if (!user) {
      logger.log("info", "User Not Found");
      return next(new ErrorHandler(responseMessages.userNotFound, responseFlags.notFound));
      // response.generalError(res, "User Not Found");
      // return false;
    }
    if (!(await bcrypt.compare(value.password, user.password))) {
      logger.log("info", "Password does not match!");
      return next(new ErrorHandler(responseMessages.passwordNotMatch, responseFlags.failure));
      // response.generalError(res, "Password does not match!");
      // return false;
    }
    //remove password from user before removing
    delete user.dataValues.password;
    const token = await HelperFunction.genAuthToken(
      user.user_id,
      deviceType,
      ipAddress
    );
    await userTokenService.addUserToken({
      user_id: user.user_id,
      token: token,
    });
    response.success(res, "User Registered Successfully!", { user, token });
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

module.exports = {
  getRegisterOtp,
  verifyRegisterOtp,
  getResendOtp,
  loginViaPassowrd,
  sendForgetPasswordOtp,
  verifyForgetPasswordOtp,
  reSendForgetPasswordOtp,
  forgetPasswordChangePassword
};
