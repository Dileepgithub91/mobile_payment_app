const Validator = require("../validations/otpverify.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const { authServices, userServices } = require("../services");

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
    response.success(res, "Your otp have been sent");
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { mobileNo, otp } = req.body;
    const now = new Date().toISOString();
    const value = await Validator.register_otp_verify.validateAsync({
      mobileNo: mobileNo,
      otp: otp,
    });
    const registeredUser = await authServices.findRegistrationUser({
      mobile_no: value.mobileNo,
    });

    const blockedDate = new Date(registeredUser.blocked_untill);

    if (blockedDate >= now) {
      logger.log("info", "You have Used up your otp tries,try again later");
      response.validatationError(
        res,
        "You have Used up your otp tries,try again later"
      );
      return false;
    }

    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;

    if (registeredUser.otp !== otp) {
      await authServices.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        registeredUser.id
      );
      logger.log("info", "Invalid Otp!, enter correct otp.");
      response.validatationError(res, "Invalid Otp!, enter correct otp.");
      return false;
    }
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
    await authServices.updateRegistrationUser(
      { current_step: "user-profile" },
      registeredUser.id
    );
    const user = await userServices.addUser({
      first_name: "guest",
      last_name: "user",
      mobile_no: value.mobileNo,
    });
    response.success(res, "User Registered Successfully!",user);
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
    response.success(res, "Your otp have been sent");
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
};
