const express = require('express');
const ticketsController = require('../controllers/tickets.controller');
const router = express.Router();

//Middleware
const auth = require("../middleware/auth");
const TicketUploader = require("../uploader/ticket.uploader");

router.post('/create-ticket',auth("createOwn", "Order"),TicketUploader.fields([{ name: "ticket_doc", maxCount: 1 }]), ticketsController.saveTicket);
router.post('/create-reply',auth("createOwn", "Order"),TicketUploader.fields([{ name: "ticket_doc", maxCount: 1 }]), ticketsController.saveTicketReply);
router.get('/all',auth("readOwn", "Order"), ticketsController.getTicketLists);
router.get('/details',auth("readOwn", "Order"), ticketsController.getTicketDetails);


module.exports = router