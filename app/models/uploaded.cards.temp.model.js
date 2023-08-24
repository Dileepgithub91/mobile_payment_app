module.exports = (sequelize, DataTypes) => {
    const UploadedCardsTemp = sequelize.define("uploaded_cards_temp", {
      batch_process_Id: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      format_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_pin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_otp_pin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activation_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activation_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cvv_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:0
      },
      isuue_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      error: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PROCESSING",
      },
    });
    return UploadedCardsTemp;
  };
  