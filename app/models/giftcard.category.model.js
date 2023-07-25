module.exports = (sequelize, DataTypes) => {
    const giftCardCategory = sequelize.define("giftcard_category", {
      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      subcategoriesCount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subcategories: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    });
    return giftCardCategory;
  };
  