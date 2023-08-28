module.exports = (sequelize, DataTypes) => {
    const TaxSetting = sequelize.define("tax_settings", {
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
      tds_w_pan: {
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
    return TaxSetting;
  };
  