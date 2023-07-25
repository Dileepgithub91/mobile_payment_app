module.exports = (sequelize, DataTypes) => {
    const giftCardProducts = sequelize.define("giftcard_products", {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    });
    return giftCardProducts;
  };
  