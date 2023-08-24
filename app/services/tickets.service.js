const db = require("../models");
const logger =require("../logger");

//Create Main Model
const Ticket = db.Ticket;
const User = db.User;
const TicketReply = db.TicketReply;

const addTickets = async (body) => {
  try {
    let ticket = await Ticket.create(body);
    return ticket;
  } catch (error) {
    logger.log("error",{source:"ticket managemant Services  -- add Tickets",error});
    throw error;
  }
};
const addTicketReply = async (body) => {
  try {
    let ticket = await Ticket.findOne({
      where: {
        id: body.ticket_id,
      },
    });
    if (ticket==null) {
      throw new Error("Invalid Ticket!");
    }
    let reply = await TicketReply.create(body);
    return reply;
  } catch (error) {
    logger.log("error",{source:"ticket managemant Services  -- add icket Reply",error});
    throw error;
  }
};

const findTicketDetails = async (id) => {
  try {
    let tickets = await Ticket.findOne({
      where: {
        id:id
      },
      include: [
        {
          model: User,
          attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
        {
          model: TicketReply
        },
      ],
    });
    return tickets;
  } catch (error) {
    logger.log("error",{source:"ticket managemant Services  -- find Ticket Details",error});
    throw error;
  }
};

const findTickets = async (query) => {
  try {
    let tickets = await Ticket.findAll({
      where: query,
      include: [
        {
          model: User,
          attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
      ],
    });
    if(tickets.length==0){
        throw new Error("Ticket Not Found!")
    }
    return tickets;
  } catch (error) {
    logger.log("error",{source:"ticket managemant Services  -- find Tickets",error});
    throw error;
  }
};

module.exports = {
    addTickets,
    addTicketReply,
    findTicketDetails,
    findTickets,
};
