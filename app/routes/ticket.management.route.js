const express = require('express');
const ticketController = require('../controllers/ticket.controller');
const router = express.Router();

const TicketUploader = require("../uploader/ticket.uploader");

router.post('/create-ticket',TicketUploader.fields({ name: "ticket_doc", maxCount: 1 }), ticketController.saveTicket);
router.post('/create-reply',TicketUploader.fields({ name: "ticket_doc", maxCount: 1 }), ticketController.saveTicketReply);
router.get('/tickets', ticketController.getTicketLists);
router.get('/ticket-details', ticketController.getTicketDetails);


module.exports = router