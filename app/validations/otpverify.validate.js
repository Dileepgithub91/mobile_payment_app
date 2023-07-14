
const Joi = require("joi");

module.exports.register_otp = Joi.object({
  mobileNo: Joi.string()
      .pattern(new RegExp("^[0-9]{10,12}$"))
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number format'
      })
  });
module.exports.register_otp_verify = Joi.object({
  mobileNo: Joi.string()
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
  mobileNo: Joi.string()
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
