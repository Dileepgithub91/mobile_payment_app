module.exports = (sequelize, DataTypes) => {
  const UserKycDetails = sequelize.define("user_kyc_details", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adhaar_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adhaar_image_front: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adhaar_image_back: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adhaar_attachmented_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adhaar_kyc_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan_kyc_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driving_license: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passport_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voter_id_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_state_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gst_kyc_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return UserKycDetails;
};
