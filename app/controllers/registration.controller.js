const bcrypt = require("bcrypt");
const moment = require("moment");
const Validator = require("../validations/otpverify.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const { responseMessages, responseFlags } = require("../core/constants");
const HelperFunction = require("../helpers/functions");
const catchAsyncError = require("../middleware/catch.async.error");
const generatePDF =require('../helpers/generate.pdf.helper');
const {
  authService,
  userService,
  userTokenService,
  dataGenService,
  emailService
} = require("../services");
const ErrorHandler = require("../helpers/error.handler");

const getRegisterOtp = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const value = await Validator.registerOtp.validateAsync(req.body);
  const checkUserExists = await userService.getUserByMobile(value.mobile_no);
  if (checkUserExists) {
    throw new ErrorHandler("User Exists!",400);
  }
  const registeredUser = await authService.addRegistrationUser({
    mobileNo: value.mobile_no,
    verificationType: "register",
    signup_aggreement: value.signup_aggreement,
  });
  // //api to send otp
  await dataGenService.sendOtp(value.mobile_no, registeredUser.otp);
  response.success(res, "Your otp have been sent", registeredUser);
});

const verifyRegisterOtp = catchAsyncError(async (req, res, next) => {
  const { mobile_no, otp, device_type, ip_address } = req.body;
  const now = new Date().toISOString();
  const endDate = moment(new Date());
  ///validate input
  const value = await Validator.registerOtpVerify.validateAsync({
    mobile_no: mobile_no,
    otp: otp,
  });
  //check if user Exists
  const userExist = await userService.getUserByMobile(value.mobile_no);
  if (userExist) {
    response.success(res, responseMessages.userAlreadyExist, userExist);
    return true;
  }
  ///find registered user
  const registeredUser = await authService.findRegistrationUser({
    mobile_no: value.mobile_no,
    verification_type: "register",
  });
  if (!registeredUser) {
    throw new ErrorHandler(responseMessages.userNotFound,responseFlags.notFound);
  }
  const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
  //check if the user has not exceeded otp limit i.e. 3
  if (updatedRetriesValue > 3) {
    logger.log(
      "info",
      "You have exceeded no of tries for otp,you can resend otp!"
    );
    throw new ErrorHandler(responseMessages.otpTryExceded,responseFlags.failure);
  }
  //check as the otp must be generated within 5 min
  const startDate = moment(registeredUser.updated_at);
  const diffInMinutes = endDate.diff(startDate, "minutes");
  if (diffInMinutes > 5) {
    logger.log("info", "You Otp  has Expired, please resend new otp!");
    throw new ErrorHandler(responseMessages.otpExpired,responseFlags.failure);
  }
  //check if the otp is correct
  if (registeredUser.otp !== otp) {
    await authService.updateRegistrationUser(
      { no_of_retries: updatedRetriesValue },
      { id: registeredUser.id, verification_type: "register" }
    );
    logger.log("info", "Invalid Otp!, enter correct otp.");
    throw new ErrorHandler(responseMessages.otpInvalid,responseFlags.failure);
  }

  ///in case all ok update current step so when login goes to user profile
  await authService.updateRegistrationUser(
    { current_step: "user-profile" },
    { id: registeredUser.id, verification_type: "register" }
  );
  //generate 8 length
  const password = await HelperFunction.generateStrongPassword(8);
  console.log(`password ${password}`);
  const hashedPassword = await bcrypt.hash(password, 10);
  //add new user
  const user = await userService.addUser({
    first_name: "guest",
    last_name: "user",
    mobile_no: value.mobile_no,
    password: hashedPassword,
    next_step: "Update-Profile",
  });
  //generate token
  const token = await HelperFunction.genAuthToken(
    user.id,
    device_type,
    ip_address
  );
  await userTokenService.addUserToken({
    user_id: user.id,
    token: token,
  });
 //send sms of new User ANd PAssword

  response.success(res, "User Registered Successfully!", {
    user,
    token,
    password,
  });
});

const getResendOtp = catchAsyncError(async (req, res, next) => {
  const { mobile_no } = req.body;
  const value = await Validator.registerOtp.validateAsync({
    mobile_no: mobile_no,
  });
  const checkUserExists = await userService.getUserByMobile(value.mobile_no);
  if (checkUserExists != null) {
    logger.log("info", "User Exists, Can't be registered again!");
    throw new ErrorHandler(responseMessages.userExist,responseFlags.failure);
  }
  const user = await authService.findRegistrationUser({
    mobile_no: value.mobile_no,
    verification_Type: "register",
  });
  if (!user) {
    logger.log("info", `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  const registeredUser = await authService.addRegistrationUser({
    mobileNo: value.mobile_no,
    verificationType: "register",
  });
  ///api to send otp
  await dataGenService.sendOtp(value.mobile_no, registeredUser.otp);
  response.success(res, "Your otp have been sent", registeredUser);
});

const sendForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  const { mobile_no } = req.body;
  const value = await Validator.registerOtp.validateAsync({
    mobile_no: mobile_no,
  });

  const user = await userService.getUserByMobile(value.mobile_no);
  if (!user) {
    logger.log("info",  `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  const registeredUser = await authService.addRegistrationUser({
    mobileNo: value.mobile_no,
    verificationType: "forget",
  });
  ///api to send otp
  await dataGenService.sendOtp(value.mobile_no, registeredUser.otp);
  response.success(res, "Your otp have been sent", registeredUser);
});

const reSendForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  const { mobile_no } = req.body;
  const value = await Validator.registerOtp.validateAsync({
    mobile_no: mobile_no,
  });

  const user = await authService.findRegistrationUser({
    mobile_no: value.mobile_no,
    verification_type: "forget",
  });
  if (!user) {
    logger.log("info",  `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  const registeredUser = await authService.addRegistrationUser({
    mobileNo: value.mobile_no,
    verificationType: "forget",
  });
  ///api to send otp
  await dataGenService.sendOtp(value.mobile_no, registeredUser.otp);
  response.success(res, "Your otp have been sent", registeredUser);
});

const verifyForgetPasswordOtp = catchAsyncError(async (req, res, next) => {
  const { mobile_no, otp } = req.body;
  const now = new Date().toISOString();
  ///validate input
  const value = await Validator.registerOtpVerify.validateAsync({
    mobile_no: mobile_no,
    otp: otp,
  });
  ///find user
  const registeredUser = await authService.findRegistrationUser({
    mobile_no: value.mobile_no,
    verification_type: "forget",
  });
  if (!registeredUser) {
    logger.log("info", `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
  //check if the user has not exceeded otp limit i.e. 3
  if (updatedRetriesValue >= 3) {
    logger.log(
      "info",
      "You have exceeded no of tries for otp,you can resend otp"
    );
    throw new ErrorHandler(responseMessages.otpTryExceded,responseFlags.failure);
  }

  //check as the otp must be generated within 5 min
  const endDate = moment(new Date());
  const startDate = moment(registeredUser.updated_at);
  const diffInMinutes = endDate.diff(startDate, "minutes");
  if (diffInMinutes > 5) {
    logger.log("info", "You Otp  has Expired, please resend new otp!");
    throw new ErrorHandler(responseMessages.otpExpired,responseFlags.failure);
  }
  //check if the otp is correct
  if (registeredUser.otp !== otp) {
    await authService.updateRegistrationUser(
      { no_of_retries: updatedRetriesValue },
      { id: registeredUser.id, verification_type: "forget" }
    );
    logger.log("info", "Invalid Otp!, enter correct otp.");
    throw new ErrorHandler(responseMessages.otpInvalid,responseFlags.failure);
  }
  const forgetPasswordToken=await HelperFunction.generateRandomSecureToken();
  await authService.updateRegistrationUser(
    { forget_password_token: forgetPasswordToken },
    { id: registeredUser.id, verification_type: "forget" }
  );
  //Sent email for change password
  response.success(
    res,
    "A email for change password has been sent to your registered email!",
    { registeredUser }
  );
});

const forgetPasswordChangePassword = catchAsyncError(async (req, res, next) => {
  const { mobile_no, new_password, confirm_password, forget_password_token } = req.body;
  const value = await Validator.validateChangePassword.validateAsync(req.body);
  const hashedPassword = await bcrypt.hash(value.new_password, 10);
  const registeredUser = await authService.findRegistrationUser({
    mobile_no: value.mobile_no,
    verification_type: "forget",
  });
  if (!registeredUser) {
    logger.log("info", `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  if(registeredUser.forget_password_token!=value.forget_password_token){
    logger.log("info", `Invalid Access Token`);
    throw new ErrorHandler("Invalid Access Token",responseFlags.notFound);
  }
  const findUser = await userService.getUserByMobile(mobile_no);
  if (!findUser) {
    throw new ErrorHandler(responseMessages.userNotFound,responseFlags.notFound);
  }
  const user = await userService.updateUser(
    {
      password: hashedPassword,
    },
    findUser.id
  );
  response.success(res, "User Password Changed Successfully!", user);
});

const loginViaPassowrd = catchAsyncError(async (req, res, next) => {
  const { mobile_no, password, deviceType, ipAddress } = req.body;
  const value = await Validator.userLogin.validateAsync({
    mobile_no: mobile_no,
    password: password,
  });
  const user = await userService.getUserByMobile(value.mobile_no);
  if (!user) {
    logger.log("info",  `Invalid Mobile Number ${value.mobile_no}`);
    throw new ErrorHandler(responseMessages.invalidMobile,responseFlags.notFound);
  }
  if (!(await bcrypt.compare(value.password, user.password))) {
    logger.log("info", "Password does not match!");
    throw new ErrorHandler(responseMessages.passwordNotMatch,responseFlags.failure);
  }
  //remove password from user before removing
  delete user.dataValues.password;
  const token = await HelperFunction.genAuthToken(
    user.id,
    deviceType,
    ipAddress
  );
  await userTokenService.addUserToken({
    user_id: user.id,
    token: token,
  });
  response.success(res, "User Registered Successfully!", { user, token });
});

module.exports = {
  getRegisterOtp,
  verifyRegisterOtp,
  getResendOtp,
  loginViaPassowrd,
  sendForgetPasswordOtp,
  verifyForgetPasswordOtp,
  reSendForgetPasswordOtp,
  forgetPasswordChangePassword,
};
