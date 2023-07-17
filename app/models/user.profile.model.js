module.exports = (sequelize, DataTypes) => {
  const User_profile = sequelize.define("user_profile", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bussiness_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alternate_mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agreement_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agreement_completed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refferal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referred_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signup_completed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kyc_level: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "0",
    },
    last_login: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return User_profile;
};