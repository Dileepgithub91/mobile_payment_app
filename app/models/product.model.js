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
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_out_of_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    is_trending: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    deleted_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return giftCardProducts;
};
