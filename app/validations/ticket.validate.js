const Joi = require("joi");

module.exports.saveTicket = Joi.object({
  order_id: Joi.string().required(),
  subject: Joi.string().required(),
  description: Joi.string().required(),
});
module.exports.saveReply = Joi.object({
  ticket_doc: Joi.string().allow('').allow(null),
  ticket_id: Joi.string().required(),
  reply: Joi.string().required()
});
module.exports.getTicketDetails = Joi.object({
  ticket_id: Joi.string().required()
});
