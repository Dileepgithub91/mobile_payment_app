module.exports = (sequelize, DataTypes) => {
  const PurchaseMargin = sequelize.define("purchase_margins", {
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    min_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    max_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    margin_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    margin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_margin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extra_margin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return PurchaseMargin;
};
