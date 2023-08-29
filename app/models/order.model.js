module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("orders", {
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sell_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    coupon_code_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    send_as_gift: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    no_of_items: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    no_of_success: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    no_of_pending: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    no_of_failed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    refund_Amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "inProgress",
    },
  });
  return Order;
};
