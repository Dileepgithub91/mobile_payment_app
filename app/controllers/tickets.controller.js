const { response } = require("../helpers");
const logger = require("../logger");
const { ticketService } = require("../services");
const { ticketValidator } = require("../validations");

const saveTicket = async (req, res, next) => {
  try {
    const value=await ticketValidator.saveTicket.validateAsync(req.body);
    if (req.files) {
        value.document = req.files.ticket_doc[0].path;
      }
    const ticket = await ticketService.addTickets(value);
    response.success(res, "new ticket created!", ticket);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};

const saveTicketReply = async (req, res, next) => {
  try {
    const value=await ticketValidator.saveReply.validateAsync(req.body);
    if (req.files) {
        value.document = req.files.ticket_doc[0].path;
      }
      value.user_id=req.user.user_id;
    const reply = await ticketService.addTicketReply(value);
    response.success(res, "Reply sent!!", reply);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};

const getTicketLists = async (req, res, next) => {
  try {
    let query =req.query ||{};
    const tickets = await ticketService.findTickets(query);
    response.success(res, "Tickets Lists!", tickets);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};

const getTicketDetails = async (req, res, next) => {
  try {
    const value=await ticketValidator.getTicketDetails.validateAsync(req.query);
    const ticket = await ticketService.findTicketDetails(value.ticket_id);
    response.success(res, "Ticket Details And reply!", ticket);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};

module.exports = {
    saveTicket,
    saveTicketReply,
    getTicketLists,
    getTicketDetails
};
