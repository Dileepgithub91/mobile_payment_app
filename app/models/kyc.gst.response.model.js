module.exports = (sequelize, DataTypes) => {
  const kyc_gst_detail = sequelize.define("kyc_gst_detail", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    field_visit_conducted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gstin_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_jurisdiction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    constitution_of_business: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gstin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_registration:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    center_jurisdiction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxpayer_type:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_id:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    filing_status: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        [
          {"":""},{"":""}
        ]
      ],
    },
    date_of_cancellation:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });
  return kyc_gst_detail;
};
