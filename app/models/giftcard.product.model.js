module.exports = (sequelize, DataTypes) => {
    const giftCardProducts = sequelize.define("giftcard_products", {
      card_source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_schema: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      external_card_identification: {
        type: DataTypes.STRING,
        allowNull: true,
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
      min_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      max_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expire_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"0"
      },
      expire_duration: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"0"
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
  