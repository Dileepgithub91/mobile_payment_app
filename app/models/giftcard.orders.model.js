module.exports = (sequelize, DataTypes) => {
  const giftcardOrders = sequelize.define("giftcard_orders", {
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    billing: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isConsolidated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payments: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return giftcardOrders;
};
