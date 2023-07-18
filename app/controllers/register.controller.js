const bcrypt = require("bcrypt");
const Validator = require("../validations/otpverify.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const HelperFunction = require("../helpers/functions");
const {
  authServices,
  userServices,
  userTokenServices,
  dataGenService,
} = require("../services");

const getRegisterOtp = async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const value = await Validator.register_otp.validateAsync({
      mobileNo: mobileNo,
    });
    const registeredUser = await authServices.addRegistrationUser({
      mobileNo: value.mobileNo,
    });
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { mobileNo, otp, deviceType, ipAddress } = req.body;
    const now = new Date().toISOString();
    ///validate input
    const value = await Validator.register_otp_verify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
    ///find user
    const registeredUser = await authServices.findRegistrationUser({
      mobile_no: value.mobileNo,
    });

    const blockedDate = new Date(registeredUser.blocked_untill);
    //check if the user has not been blocked besacuse of exceeded otp limit i.e. 3
    if (blockedDate >= now) {
      logger.log("info", "You have Used up your otp tries,try again later");
      response.validatationError(
        res,
        "You have Used up your otp tries,try again later"
      );
      return false;
    }

    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
    //check if the otp is correct
    if (registeredUser.otp !== otp) {
      await authServices.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        registeredUser.id
      );
      logger.log("info", "Invalid Otp!, enter correct otp.");
      response.validatationError(res, "Invalid Otp!, enter correct otp.");
      return false;
    }
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue >= 3) {
      await authServices.updateRegistrationUser(
        { no_of_retries: 0, blocked_untill: now },
        registeredUser.id
      );
      logger.log(
        "info",
        "You have exceeded no of tries for otp,you can try again tomorrow"
      );
      response.validatationError(res, "Invalid Otp!, enter correct otp.");
      return false;
    }
    ///in case all ok update current step so when login goes to user profile
    await authServices.updateRegistrationUser(
      { current_step: "user-profile" },
      registeredUser.id
    );
    //generate 8 length
    const password = await HelperFunction.generateStrongPassword(8);
    const hashedPassword = await bcrypt.hash(password, 10);
    //add new user
    const user = await userServices.addUser({
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
    await userTokenServices.addUserToken({
      user_id: user.user_id,
      token: token,
    });
    response.success(res, "User Registered Successfully!", { user, token });
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getResendOtp = async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const value = await Validator.register_otp.validateAsync({
      mobileNo: mobileNo,
    });
    const user = await authServices.findRegistrationUser({
      mobile_no: value.mobileNo,
    });
    if (!user) {
      logger.log("info", "User Not Found");
      response.generalError(res, "User Not Found");
      return false;
    }
    const passotp = Math.floor(100000 + Math.random() * 900000);
    await authServices.updateRegistrationUser({ otp: passotp }, user.id);
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, registeredUser.otp);
    response.success(res, "Your otp have been sent");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const sendForgetPasswordOtp = async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const value = await Validator.register_otp.validateAsync({
      mobileNo: mobileNo,
    });
    const user = await authServices.findRegistrationUser({
      mobile_no: value.mobileNo,
    });
    if (!user) {
      logger.log("info", "User Not Found");
      response.generalError(res, "User Not Found");
      return false;
    }
    const passotp = Math.floor(100000 + Math.random() * 900000);
    //forget password ki otp where to save
    await authServices.updateRegistrationUser({ otp: passotp }, user.id);
    ///api to send otp
    await dataGenService.sendOtp(value.mobileNo, passotp);
    response.success(res, "Your otp have been sent");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const verifyForgetPasswordOtp = async (req, res, next) => {
  try {
    const { mobileNo, otp } = req.body;
    const now = new Date().toISOString();
    ///validate input
    const value = await Validator.register_otp_verify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
    ///find user
    const registeredUser = await authServices.findRegistrationUser({
      mobile_no: value.mobileNo,
    });

    const blockedDate = new Date(registeredUser.blocked_untill);
    //check if the user has not been blocked besacuse of exceeded otp limit i.e. 3
    if (blockedDate >= now) {
      logger.log("info", "You have Used up your otp tries,try again later");
      response.validatationError(
        res,
        "You have Used up your otp tries,try again later"
      );
      return false;
    }

    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
    //check if the otp is correct
    if (registeredUser.otp !== otp) {
      await authServices.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        registeredUser.id
      );
      logger.log("info", "Invalid Otp!, enter correct otp.");
      response.validatationError(res, "Invalid Otp!, enter correct otp.");
      return false;
    }
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue >= 3) {
      await authServices.updateRegistrationUser(
        { no_of_retries: 0, blocked_untill: now },
        registeredUser.id
      );
      logger.log(
        "info",
        "You have exceeded no of tries for otp,you can try again tomorrow"
      );
      response.validatationError(res, "Invalid Otp!, enter correct otp.");
      return false;
    }
    //Sent email for change password
    response.success(
      res,
      "A email for change password has been sent to your registered email!",
      { user, token }
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const loginViaPassowrd = async (req, res, next) => {
  try {
    const { mobileNo, password, deviceType, ipAddress } = req.body;
    const value = await Validator.userLogin.validateAsync({
      mobileNo: mobileNo,
      password: password,
    });
    const user = await userServices.getUserByMobile(value.mobileNo);
    if (!user) {
      logger.log("info", "User Not Found");
      response.generalError(res, "User Not Found");
      return false;
    }
    if (!(await bcrypt.compare(value.password, user.password))) {
      logger.log("info", "Password does not match!");
      response.generalError(res, "Password does not match!");
      return false;
    }
    //remove password from user before removing
    delete user.dataValues.password;
    const token = await HelperFunction.genAuthToken(
      user.user_id,
      deviceType,
      ipAddress
    );
    await userTokenServices.addUserToken({
      user_id: user.user_id,
      token: token,
    });
    response.success(res, "User Registered Successfully!", { user, token });
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  getRegisterOtp,
  verifyRegisterOtp,
  getResendOtp,
  loginViaPassowrd,
  sendForgetPasswordOtp,
  verifyForgetPasswordOtp,
};
