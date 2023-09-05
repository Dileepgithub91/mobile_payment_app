var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const TaxSettingHistory = sequelize.define("tax_setting_history", {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxable: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_tds: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_cess: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_s_fee: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      hsn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sgst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cgst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      igst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gst: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cess: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s_mode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s_fees: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tds: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tds_w_pan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicable_from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicable_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approved_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    },config);
    return TaxSettingHistory;
  };
  