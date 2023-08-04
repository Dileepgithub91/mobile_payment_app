const express = require('express');
const ticketsController = require('../controllers/tickets.controller');
const router = express.Router();

const TicketUploader = require("../uploader/ticket.uploader");

router.post('/create-ticket',TicketUploader.fields({ name: "ticket_doc", maxCount: 1 }), ticketsController.saveTicket);
router.post('/create-reply',TicketUploader.fields({ name: "ticket_doc", maxCount: 1 }), ticketsController.saveTicketReply);
router.get('/tickets', ticketsController.getTicketLists);
router.get('/ticket-details', ticketsController.getTicketDetails);


module.exports = router