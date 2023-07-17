const Joi = require("joi");

module.exports.saveNewCustomerRequest = Joi.object({
  firstName: Joi.string(),
  middleName: Joi.string(),
  lastName: Joi.string(),
  requestType: Joi.string(),
  mobileNo: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  zipCode: Joi.string(),
  services: Joi.string(),
  businessName: Joi.string(),
  businessAddress1: Joi.string(),
  businessAddress2: Joi.string(),
  monthalyTurnOver:Joi.string()
});