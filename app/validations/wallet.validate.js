const Joi = require("joi");

module.exports.saveWallet = Joi.object({
  firstname: Joi.string(),
  middlename: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string(),
  avtar: Joi.string(),
  alternateMobile: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
  refferalCode: Joi.string(),
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  stateId: Joi.string(),
  cityId: Joi.string(),
  postcode: Joi.string(),
  whatsappNumber: Joi.string(),
});

module.exports.validateUpdateStatus = Joi.object({
  status: Joi.string().required(),
});
module.exports.validateNewUserActivateWallet = Joi.object({
  status: Joi.string().required(),
});
module.exports.validateWalletDetails = Joi.object({
  id: Joi.string().required()
});
