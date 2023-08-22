const Joi = require("joi");

module.exports.validateProvider = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    sub_category_id: Joi.string().required(),
    provider_type: Joi.string().required(),
    is_down: Joi.number().min(0).max(1).required(),
    config: Joi.object().required(),
  });
module.exports.validateEditProvider = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    category_id: Joi.string(),
    sub_category_id: Joi.string(),
    provider_type: Joi.string(),
    is_down: Joi.number().min(0).max(1),
    config: Joi.object(),
  });

module.exports.validateUpdateStatus = Joi.object({
    id: Joi.string().required(),
    status: Joi.number().min(0).max(1).required(),
  });

module.exports.validateProviderDetails = Joi.object({
    id: Joi.string().required(),
})