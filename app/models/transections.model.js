module.exports = (sequelize, DataTypes) => {
    const Transection = sequelize.define("transections", {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transection_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
    });
    return Transection;
  };
  