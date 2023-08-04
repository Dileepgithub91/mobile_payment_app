const { response } = require("../helpers");
const logger = require("../logger");
const {responseMessages,responseFlags} = require("../core/constants");
const HelperFunction = require("../helpers/functions");
const catchAsyncError=require('../middleware/catch.async.error');
const { ticketService } = require("../services");
const { ticketValidator } = require("../validations");

const saveTicket = catchAsyncError(async (req, res, next) => {
    const value=await ticketValidator.saveTicket.validateAsync(req.body);
    if (req.files) {
        value.document = req.files.ticket_doc[0].path;
      }
    const ticket = await ticketService.addTickets(value);
    response.success(res, "new ticket created!", ticket);
});

const saveTicketReply = catchAsyncError(async (req, res, next) => {
    const value=await ticketValidator.saveReply.validateAsync(req.body);
    if (req.files) {
        value.document = req.files.ticket_doc[0].path;
      }
      value.user_id=req.user.user_id;
    const reply = await ticketService.addTicketReply(value);
    response.success(res, "Reply sent!!", reply);
});

const getTicketLists = catchAsyncError(async (req, res, next) => {
    let query =req.query ||{};
    const tickets = await ticketService.findTickets(query);
    response.success(res, "Tickets Lists!", tickets);
});

const getTicketDetails =catchAsyncError(async (req, res, next) => {
    const value=await ticketValidator.getTicketDetails.validateAsync(req.query);
    const ticket = await ticketService.findTicketDetails(value.ticket_id);
    response.success(res, "Ticket Details And reply!", ticket);
});

module.exports = {
    saveTicket,
    saveTicketReply,
    getTicketLists,
    getTicketDetails
};
