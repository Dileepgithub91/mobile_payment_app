module.exports = (sequelize, DataTypes) => {
  const SaleMargin = sequelize.define("sales_margins", {
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      allowNull: true,
    },
    margin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_margin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extra_margin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
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
  return SaleMargin;
};
