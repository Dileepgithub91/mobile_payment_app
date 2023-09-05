
const Joi = require("joi");

module.exports.registerOtp = Joi.object({
  mobile_no: Joi.string()
      .pattern(new RegExp("^[0-9]{10,12}$"))
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number format'
      }),
      signup_aggreement:Joi.number().min(1).max(1).messages({
        'string.pattern.base': 'You must agree to terms and conditions!'
      })
  });
module.exports.registerOtpVerify = Joi.object({
  mobile_no: Joi.string()
      .pattern(new RegExp("^[0-9]{10,12}$"))
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number format'
      }),
    otp: Joi.string()
      .pattern(new RegExp("^[0-9]{6}$"))
      .required()
      .messages({
        'string.pattern.base': 'OTP is Required'
      })
  });

module.exports.userLogin = Joi.object({
  mobile_no: Joi.string()
      .pattern(new RegExp("^[0-9]{10,12}$"))
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number format'
      }),
    password: Joi.string()
      .required()
      .messages({
        'string.pattern.base': 'Passoword is Required'
      })
  });

  module.exports.validateChangePassword = Joi.object({
    mobile_no: Joi.string().trim().min(1).required(),
    forget_password_token: Joi.string().required(),
    new_password: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref('new_password'))
    .messages({ 'any.only': 'Confirm password must match the new password' }),
  });