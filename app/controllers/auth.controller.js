const boom = require("@hapi/boom");
const Validator = require("../validations/otpverify.validate");
const otpVerifyServices = require("../services/otpverify.service");

const AuthController = {
  async genPassCode(req, res, next) {
    try {
        console.log(req.body);
      const { mobile_no } = req.body;
      const value = await Validator.register_otp.validateAsync({
        mobile_no: mobile_no,
      });
      await otpVerifyServices.addVerificationOtp(value);
      res.status(200).send({ msg: "Your otp have been sent" });
    } catch (error) {
      const boomError = boom.badRequest(error.message);
      next(boomError);
    }
  },
};

module.exports = AuthController;
