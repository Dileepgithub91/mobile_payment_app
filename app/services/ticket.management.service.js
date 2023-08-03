const db = require("../models");

//Create Main Model
const Ticket = db.ticket;
const TicketReply = db.ticket_reply;

const addTickets = async (body) => {
  try {
    const description = body.description;
    let tickets = await Ticket.findAll({
      where: {
        description: description,
      },
    });
    if (tickets.length != 0) {
      throw new Error("Role Exists, try again!");
    }
    let ticket = await Ticket.create(body);
    return ticket;
  } catch (error) {
    throw error;
  }
};
const addTicketReply = async (body) => {
  try {
    const description = body.description;
    let replys = await TicketReply.findAll({
      where: {
        description: description,
      },
    });
    if (replys.length != 0) {
      throw new Error("Role Exists, try again!");
    }
    let reply = await TicketReply.create(body);
    return reply;
  } catch (error) {
    throw error;
  }
};

const findTicketDetails = async (id) => {
  try {
    let tickets = await Ticket.findAll({
      where: {
        id:id
      },
    });
    if(tickets.length==0){
        throw new Error("Ticket Not Found!")
    }
    let replys = await TicketReply.findAll({
      where: {
        ticket_id:tickets[0].dataValues.id
      },
    });
    return {
        ticket:tickets[0].dataValues,
        reply:replys
    };
  } catch (error) {
    throw error;
  }
};
const findTickets = async (query) => {
  try {
    let tickets = await Ticket.findAll({
      where: query,
    });
    if(tickets.length==0){
        throw new Error("Ticket Not Found!")
    }
    return tickets;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    addTickets,
    addTicketReply,
    findTicketDetails,
    findTickets,
};
