module.exports = (sequelize, DataTypes) => {
    const CardProviderSetting = sequelize.define("card_provider_setting", {
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider_ref: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount_rule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block_amount_rule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_rule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block_user_rule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
      }
    });
    return CardProviderSetting;
  };
  