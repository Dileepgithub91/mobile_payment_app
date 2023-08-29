module.exports = (sequelize, DataTypes) => {
    const ActiveCard = sequelize.define("active_card", {
      ref_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
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
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referenceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      card_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      masked_card_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    });
    return ActiveCard;
  };
  