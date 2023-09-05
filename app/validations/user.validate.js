const Joi = require("joi");

module.exports.saveUserProfile = Joi.object({
  first_name: Joi.string(),
  middle_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  avatar: Joi.string(),
  alternate_mobile: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
    refferal_code: Joi.string(),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    state_id: Joi.string(),
    city_id: Joi.string(),
    post_code: Joi.string(),
    whatsapp_number: Joi.string(),
});

module.exports.updateUserProfileAvatar = Joi.object({
  avatar: Joi.string().uri().required(),
});
module.exports.verifyAutoGst = Joi.object({
  gst_no: Joi.string().required(),
});
module.exports.verifyAutoPan = Joi.object({
  pan: Joi.string().required(),
});
module.exports.verifyAutoAadhar = Joi.object({
  aadhar_no: Joi.string().required(),
});
module.exports.verifyAutoAadharOTP = Joi.object({
  client_id: Joi.string().required(),
  otp: Joi.string().required()
});
