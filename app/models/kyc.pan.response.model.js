module.exports = (sequelize, DataTypes) => {
  const kyc_pan_detail = sequelize.define("kyc_pan_detail", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    full_name_split: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    masked_aadhaar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING, 
      allowNull: true,
      defaultValue: JSON.stringify({"":""}), 
      get() {
        const rawValue = this.getDataValue('address');
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue('address', JSON.stringify(value));
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    input_dob: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    aadhaar_linked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dob_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dob_check: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    less_info: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return kyc_pan_detail;
};
