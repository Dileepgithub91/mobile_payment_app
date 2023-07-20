module.exports = (sequelize, DataTypes) => {
  const kyc_aadhar_detail = sequelize.define("kyc_aadhar_detail", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING, // Use TEXT type to store JSON-like data
      allowNull: true,
      defaultValue: JSON.stringify({"":""}), // Default value as an empty JSON object
      get() {
        const rawValue = this.getDataValue('address');
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue('address', JSON.stringify(value));
      },
    },
    aadhaar_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    care_of: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raw_xml: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    share_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return kyc_aadhar_detail;
};
