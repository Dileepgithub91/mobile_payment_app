module.exports = (sequelize, DataTypes) => {
    const CardFormat = sequelize.define("card_format", {
      format_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
      },
    });
    return CardFormat;
  };
  