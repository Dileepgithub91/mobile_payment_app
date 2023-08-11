module.exports = (sequelize, DataTypes) => {
    const PurchasedCard = sequelize.define("purchased_card", {
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      card_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reference_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serial_number: {
        type: DataTypes.STRING,
        allowNull: true,
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
      card_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      masked_card_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      approval_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      external_card_identifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      response_message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      response_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inProgress",
      },
    });
    return PurchasedCard;
  };
  