var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("user_token", {
    user_id: {
      type: DataTypes.INTEGER,
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
  },config);
  return Token;
};
