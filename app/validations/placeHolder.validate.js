const Joi = require("joi");
module.exports.createUser = Joi.object({
  userId: Joi.string(),
  titlr: Joi.string(),
  completed: Joi.boolean()
});

module.exports.updateUser = Joi.object({
  userId: Joi.string(),
  titlr: Joi.string(),
  completed: Joi.boolean()
});
