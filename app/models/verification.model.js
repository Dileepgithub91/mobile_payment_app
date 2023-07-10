module.exports = (sequelize, DataTypes) => {
  const Otpverify = sequelize.define("otpverify", {
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passotp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "inactive",
    },
  });
  return Otpverify;
};
