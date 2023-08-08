module.exports = (sequelize, DataTypes) => {
  const Providers = sequelize.define("providers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_down: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  });
  return Providers;
};
