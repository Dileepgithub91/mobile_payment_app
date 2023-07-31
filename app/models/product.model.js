module.exports = (sequelize, DataTypes) => {
    const giftCardProducts = sequelize.define("giftcard_products", {
        provider_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_schema: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
    return giftCardProducts;
  };
  