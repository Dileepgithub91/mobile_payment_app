var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const CardOrderDetails = sequelize.define("card_order_details", {
       card_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_mobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      send_as_gift: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },config);
    return CardOrderDetails;
  };
  