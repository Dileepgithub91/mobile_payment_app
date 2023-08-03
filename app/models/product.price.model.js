module.exports = (sequelize, DataTypes) => {
  const giftCardProducts = sequelize.define("giftcard_products", {
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return giftCardProducts;
};
