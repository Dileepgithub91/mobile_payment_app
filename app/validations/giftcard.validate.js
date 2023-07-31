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
