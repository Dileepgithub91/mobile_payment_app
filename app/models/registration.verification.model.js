module.exports = (sequelize, DataTypes) => {
  const registration_verification = sequelize.define("registration_verification", {
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_of_retries: {
      type: DataTypes.STRING,
      defaultValue:"0"
    },
    ip_address: {
      type: DataTypes.STRING,
    },
    blocked_untill: {
      type: DataTypes.STRING,
    },
    current_step: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  });
  return registration_verification;
};
