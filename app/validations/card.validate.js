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

module.exports.verifyCardSingle = Joi.object({
  provider_code: Joi.string().max(100).required(),
  name: Joi.string().required(),
  category_id: Joi.number(),
  sub_category_id: Joi.number(),
  product_description: Joi.string(),
  price_type: Joi.number(),
  min_price: Joi.string(),
  max_price: Joi.string(),
  image: Joi.string().allow(null),
});

module.exports.EditCardSingle = Joi.object({
  id: Joi.string().max(100).required(),
  provider_code: Joi.string().max(100),
  name: Joi.string(),
  category_id: Joi.number(),
  sub_category_id: Joi.number(),
  product_description: Joi.string(),
  price_type: Joi.number(),
  min_price: Joi.string(),
  max_price: Joi.string(),
  image: Joi.string().allow(null),
});

module.exports.updateStatusCardSingle = Joi.object({
  id: Joi.string().max(100).required(),
  status: Joi.string().valid("Draft", "Public", "Removed").required(),
});
module.exports.updateTrandingCardStatus = Joi.object({
  id: Joi.string().max(100).required(),
  is_trending: Joi.number().valid(0, 1).required(),
});

module.exports.cardDetails = Joi.object({
  id: Joi.string().max(100).required(),
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

//////////////////////////Card Provider Validator////////////////////////////
module.exports.verifyCardProvider = Joi.object({
  card_id: Joi.string().max(100).required(),
  provider_code: Joi.string().max(100).required(),
  name: Joi.string().required(),
  priority: Joi.number(),
  amount_rule: Joi.string(),
  block_amount_rule: Joi.string(),
  user_rule: Joi.string(),
  block_user_rule: Joi.string(),
});
module.exports.EditCardProvider = Joi.object({
  id: Joi.string().max(100).required(),
  card_id: Joi.string().max(100).required(),
  provider_code: Joi.string().max(100).required(),
  name: Joi.string().required(),
  priority: Joi.number(),
  amount_rule: Joi.string(),
  block_amount_rule: Joi.string(),
  user_rule: Joi.string(),
  block_user_rule: Joi.string(),
});

/////////////////////////////Uploaded Cards ///////////////////////////////
module.exports.validateUploadedCardDetails = Joi.object({
  id: Joi.string().max(100).required(),
});
module.exports.validateEditUploadedCard = Joi.object({
  id: Joi.string().max(100).required(),
  product_id: Joi.string(),
  card_name: Joi.string(),
  card_pin: Joi.string(),
  cvv_no: Joi.string(),
  balance: Joi.string(),
  isuue_date: Joi.string(),
  expiry_date: Joi.string(),
});

module.exports.validateSaveUploadedCard = Joi.object({
  product_id: Joi.string().required(),
  format_id: Joi.string().required(),
  card_name: Joi.string().required(),
  card_no: Joi.string().required(),
  card_pin: Joi.string().required(),
  cvv_no: Joi.string().required(),
  balance: Joi.string().required(),
  isuue_date: Joi.string().required(),
  expiry_date: Joi.string().required(),
});
