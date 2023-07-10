
const Joi = require("joi");

module.exports.register_otp = Joi.object({
    mobile_no: Joi.string()
      .pattern(new RegExp("^[0-9]{10,12}$"))
      .required()
      .messages({
        'string.pattern.base': 'Invalid mobile number format'
      })
  });