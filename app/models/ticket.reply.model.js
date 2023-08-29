module.exports = (sequelize, DataTypes) => {
    const TicketReply = sequelize.define("ticket_reply", {
        user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
        ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reply: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
    return TicketReply;
  };
  