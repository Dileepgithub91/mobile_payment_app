module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("token", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return Token;
};
