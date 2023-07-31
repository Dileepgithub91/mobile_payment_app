module.exports = (sequelize, DataTypes) => {
  const otp_verification = sequelize.define("otp_verification", {
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
    resend_tries: {
      type: DataTypes.STRING,
      defaultValue:"0"
    },
    verification_type: {
      type: DataTypes.STRING,
      defaultValue:"default"
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
  return otp_verification;
};
