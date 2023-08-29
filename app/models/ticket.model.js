module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define("ticket", {
        user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Low"
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:1
      }
    });
    return Ticket;
  };
  