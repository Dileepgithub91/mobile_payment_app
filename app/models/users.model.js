module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return User;
};
