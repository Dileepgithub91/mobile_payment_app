const Joi = require("joi");

///Margin Group Validation
module.exports.validateMarginGroup = Joi.object({
  name: Joi.string().required(),
  group_type: Joi.string().required(),
  role: Joi.string().allow(null),
  customer_name: Joi.string().allow(null),
});
module.exports.EditMarginGroup = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  group_type: Joi.string().required(),
  role: Joi.string().allow(null),
  customer_name: Joi.string().allow(null),
});
module.exports.updateMarginGroupStatus = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});
module.exports.validateMarginGroupDetails = Joi.object({
  id: Joi.string().required(),
});

/// Sales Margin Validation
module.exports.validateSalesMargin = Joi.object({
  category_id: Joi.string().required(),
  sub_category_id: Joi.string().required(),
  product_id: Joi.number().required(),
  provider_id: Joi.number().required(),
  price: Joi.number().min(0),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  margin_type: Joi.string(),
  margin: Joi.string(),
  max_margin: Joi.string(),
  frequency: Joi.string().valid(
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "quaterly"
  ),
  extra_margin: Joi.string(),
  duration: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});
module.exports.EditSalesMargin = Joi.object({
  id: Joi.string().required(),
  category_id: Joi.string().required(),
  sub_category_id: Joi.string().required(),
  product_id: Joi.number().required(),
  provider_id: Joi.number().required(),
  card_type: Joi.string().required(),
  price: Joi.number().min(0),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  margin_type: Joi.string(),
  margin: Joi.string(),
  max_margin: Joi.string(),
  frequency: Joi.string().valid(
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "quaterly"
  ),
  extra_margin: Joi.string(),
  duration: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});
module.exports.updateSalesMarginStatus = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});
module.exports.validateSalesMarginDetails = Joi.object({
  id: Joi.string().required(),
});
/// Purchase Margin Validation
module.exports.validatePurchaseMargin = Joi.object({
  category_id: Joi.string().required(),
  sub_category_id: Joi.string().required(),
  product_id: Joi.number().required(),
  provider_id: Joi.number().required(),
  price: Joi.number().min(0),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  margin_type: Joi.string(),
  margin: Joi.string(),
  max_margin: Joi.string(),
  frequency: Joi.string().valid(
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "quaterly"
  ),
  extra_margin: Joi.string(),
  duration: Joi.string(),
  start_date: Joi.string().allow(null),
  end_date: Joi.string().allow(null),
});
module.exports.EditPurchaseMargin = Joi.object({
  id: Joi.string().required(),
  category_id: Joi.string().required(),
  sub_category_id: Joi.string().required(),
  product_id: Joi.number().required(),
  provider_id: Joi.number().required(),
  card_type: Joi.string().required(),
  price: Joi.number().min(0),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  margin_type: Joi.string(),
  margin: Joi.string(),
  max_margin: Joi.string(),
  frequency: Joi.string().valid(
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "quaterly"
  ),
  extra_margin: Joi.string(),
  duration: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});
module.exports.updatePurchaseMarginStatus = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});
module.exports.validatePurchaseMarginDetails = Joi.object({
  id: Joi.string().required(),
});
