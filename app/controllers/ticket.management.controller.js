const { response } = require("../helpers");
const logger = require("../logger");
const { ticketManagementServices } = require("../services");
const { ticketValidator } = require("../validations");

const saveTicket = async (req, res, next) => {
  try {
    const value=await ticketValidator.saveTicket.validateAsync(req.body);
    if (req.files) {
        value.document = req.files.ticket_doc[0].path;
      }
    const ticket = await ticketManagementServices.addTickets(value);
    response.success(res, "new ticket created!", ticket);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
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
    const reply = await ticketManagementServices.addTicketReply(value);
    response.success(res, "Reply sent!!", reply);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getTicketLists = async (req, res, next) => {
  try {
    let query =req.query ||{};
    const tickets = await ticketManagementServices.findTickets(query);
    response.success(res, "Tickets Lists!", tickets);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getTicketDetails = async (req, res, next) => {
  try {
    const value=await ticketValidator.getTicketDetails.validateAsync(req.query);
    const ticket = await ticketManagementServices.findTicketDetails(value.ticket_id);
    response.success(res, "Ticket Details And reply!", ticket);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
    saveTicket,
    saveTicketReply,
    getTicketLists,
    getTicketDetails
};
