var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define("wallets", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regular_wallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      dmt_wallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      credit_wallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      points_wallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      sync_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    },config);
    return Wallet;
  };
  