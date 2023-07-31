module.exports = (sequelize, DataTypes) => {
  const ApiProviderSetting = sequelize.define("api_provider_setting", {
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"0"
    },
    token_expiry_date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"0"
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return ApiProviderSetting;
};
