const Joi = require("joi");

module.exports.verifynewGiftCardProduct = Joi.object({
  sku: Joi.string().max(100).required(),
  name: Joi.string().required(),
  currency: Joi.object({
    code: Joi.string(),
    symbol: Joi.string(),
    numericCode: Joi.string(),
  }),
  url: Joi.string().required(),
  minPrice: Joi.string().required(),
  maxPrice: Joi.string().required(),
  price: Joi.object({
    cpg: Joi.string(),
  }),
  images: Joi.object({
    thumbnail: Joi.string(),
    mobile: Joi.string(),
    base: Joi.string(),
    small: Joi.string(),
  }),
});

module.exports.verifynewGiftCardSchema = Joi.object({
  cardSchemeId: Joi.string().required(),
  schemeName: Joi.string().required(),
  cardName: Joi.string().required(),
  binInfo: Joi.object({
    name: Joi.string(),
    identificationNumber: Joi.string(),
    startRange: Joi.string(),
    endRange: Joi.string(),
    expiryDurationType: Joi.string(),
    expiryDuration: Joi.string(),
  }),
  isReloadable: Joi.number().required(),
  imageUrl: Joi.number().required(),
});
