module.exports = (sequelize, DataTypes) => {
  const giftCardProducts = sequelize.define("giftcard_products", {
    provider_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_type: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    max_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    min_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    is_out_of_stock: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    is_trending: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    deleted_at: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Draft",
    },
  });
  return giftCardProducts;
};
