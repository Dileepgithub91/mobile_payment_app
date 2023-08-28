module.exports = (sequelize, DataTypes) => {
    const TaxSettingVersion = sequelize.define("tax_setting_version", {
      tax_setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax_version_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
      wpan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_updated: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    });
    return TaxSettingVersion;
  };
  