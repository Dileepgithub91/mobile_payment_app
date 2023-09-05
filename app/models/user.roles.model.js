var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define("user_roles", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },config);
  return user_roles;
};
