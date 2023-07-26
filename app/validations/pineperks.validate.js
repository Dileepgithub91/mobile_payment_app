const Joi = require("joi");
const cardDetailSchema = Joi.object({
  recordIdentifier: Joi.string().required(),
  customerName: Joi.string().required(),
  mobileNumber: Joi.number().integer().required(),
  email: Joi.string().allow(null).optional(),
  amount: Joi.number().required(),
  externalCardIdentifier: Joi.string().required(),
});

module.exports.validateInstantDigital = Joi.object({
  externalRequestId: Joi.string(),
  cardSchemeId: Joi.string(),
  customerName: Joi.string(),
  mobileNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
  email: Joi.string(),
  amount: Joi.string(),
  externalCardIdentifier: Joi.string(),
  orderDescription: Joi.string().allow(null).allow(""),
});

module.exports.validateBulkDigital = Joi.object({
  cardDetailList: Joi.array().items(cardDetailSchema).min(1).required(),
  externalRequestId: Joi.string(),
  cardSchemeId: Joi.number().required(),
  orderDescription: Joi.string().allow(null).allow(""),
});
module.exports.validateCardOrderStatus = Joi.object({
  requsetId: Joi.string().required(),
});
module.exports.validateCardbalance = Joi.object({
  giftCardId: Joi.string().required(),
});
module.exports.validateCustomerCardStatusUpdate = Joi.object({
  referenceNumber: Joi.number().integer().required(),
  cardStatus: Joi.number().integer().required(),
});
module.exports.validateCustomerCardStatusUpdateByAdmin = Joi.object({
  referenceNumber: Joi.number().integer().required(),
  cardStatus: Joi.number().integer().required(),
  reason: Joi.number().integer().required(),
});
module.exports.validateUpdateCardTransection = Joi.object({
  referenceNumber: Joi.number().integer().required(),
  isEcommTransactionEnabled: Joi.string().allow(null).optional(),
  ecommTransactionLimit: Joi.string().allow(null).optional(),
  isPOSTransactionEnabled: Joi.string().required(),
  posTransactionLimit: Joi.string().required(),
  isContactlessTransactionEnabled: Joi.string().required(),
  contactlessTransactionLimit: Joi.number().integer().required(),
});
