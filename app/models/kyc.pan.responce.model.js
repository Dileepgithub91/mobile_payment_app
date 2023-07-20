module.exports = (sequelize, DataTypes) => {
  const kyc_pan_detail = sequelize.define("kyc_pan_detail", {
    user_id: {
      type: DataTypes.STRING,
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [""],
    },
    masked_aadhaar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    address: {
      line_1: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      line_2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      full: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
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
