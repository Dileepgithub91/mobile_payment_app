module.exports = (sequelize, DataTypes) => {
    const TicketReply = sequelize.define("ticket_reply", {
        user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        ticket_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reply: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return TicketReply;
  };
  