module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define("user_roles", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return user_roles;
};
