module.exports = (sequelize, DataTypes) => {
    const giftCardProducts = sequelize.define("giftcard_products", {
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minPrice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maxPrice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    });
    return giftCardProducts;
  };
  