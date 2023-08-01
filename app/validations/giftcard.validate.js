const Joi = require("joi");

module.exports.verifynewGiftCardProduct = Joi.object({
  sku: Joi.string().max(100).required(),
  name: Joi.string().required(),
  currency: Joi.object({
    code: Joi.string(),
    symbol: Joi.string().allow(null),
    numericCode: Joi.string(),
  }),
  url: Joi.string(),
  minPrice: Joi.string(),
  maxPrice: Joi.string(),
  price: Joi.object({
    cpg: Joi.array(),
  }),
  images: Joi.object({
    thumbnail: Joi.string().allow("").allow(null),
    mobile: Joi.string().allow("").allow(null),
    base: Joi.string().allow("").allow(null),
    small: Joi.string().allow(""),
  }),
});

module.exports.verifynewGiftCardSchema = Joi.object({
  cardSchemeId: Joi.number().required(),
  schemeName: Joi.string().required(),
  cardName: Joi.string().required(),
  binInfo: Joi.object({
    name: Joi.string(),
    identificationNumber: Joi.number(),
    startRange: Joi.string(),
    endRange: Joi.string(),
    expiryDurationType: Joi.string(),
    expiryDuration: Joi.string(),
  }),
  isReloadable: Joi.number(),
  imageUrl: Joi.string(),
});
