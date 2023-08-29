const Joi = require("joi");

module.exports.saveOrder = Joi.object({
  product_id: Joi.string(),
  quantity: Joi.number(),
  amount: Joi.number(),
  send_as_gift: Joi.number().min(0).max(1),
  customer_name: Joi.string(),
  customer_email: Joi.string().email(),
  customer_mobile: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
});

module.exports.checkOrderStatus = Joi.object({
  order_id:Joi.string().required()
});

module.exports.editOrder = Joi.object({
  product_id: Joi.string(),
  quantity: Joi.number(),
  amount: Joi.number(),
  sell_amount: Joi.number(),
});

module.exports.validateUpdateStatus = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
});
module.exports.validateOrderDetails = Joi.object({
  id: Joi.string().required(),
});

module.exports.saveItemOrder = Joi.object({
  items: Joi.array().min(1),
  send_as_gift: Joi.number().min(0).max(1),
  total_quantity: Joi.number().min(0),
  total_amount: Joi.number().min(0),
  customer_name: Joi.string(),
  customer_email: Joi.string().email(),
  customer_mobile: Joi.string()
    .pattern(new RegExp("^[0-9]{10,12}$"))
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number format",
    }),
});