const Joi = require("joi");

module.exports.saveNewCustomerRequest = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  mobileNo: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
 
  email: Joi.string().email().required(),
  businessName: Joi.string().required(),
  services: Joi.string(),
  zipCode: Joi.string(),
});

module.exports.saveCustomerProfile = Joi.object({
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
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  postcode: Joi.string(),
  whatsappNumber: Joi.string(),
});

module.exports.saveCustomerShopDetails = Joi.object({
  businessName: Joi.string(),
  businessEstablishedYear: Joi.string(),
  monthalyTurnOver: Joi.string(),
  yearlyTurnOver: Joi.string(),
  alternateMobile: Joi.string()
  .pattern(new RegExp("^[0-9]{10,12}$"))
  .required()
  .messages({
    "string.pattern.base": "Invalid mobile number format",
  }),
  businessEmail: Joi.string(),
  businessAddress:Joi.string(),
  businessZipCode:Joi.string(),
});

module.exports.uploadBusinessAgreement = Joi.object({
  agreementDocumentId: Joi.string().min(1).required(),
});