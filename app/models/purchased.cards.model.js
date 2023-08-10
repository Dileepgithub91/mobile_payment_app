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
        allowNull: false,
      },
      serial_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      masked_card_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approval_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      external_card_identifier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inProgress",
      },
    });
    return PurchasedCard;
  };
  