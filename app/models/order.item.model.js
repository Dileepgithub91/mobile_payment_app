module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define("order_items", {
    order_ref_id: {
      type: DataTypes.INTEGER,
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
    gst_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hsn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sgst: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    cgst: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    igst: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    gst: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    cess: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    s_fees: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    s_mode: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    tds: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    tds_w_pan: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    commission: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    discount: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sell_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PROCESSING",
    },
  });
  return OrderItems;
};
