var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const SalesMarginGroup = sequelize.define("sales_margin_group", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group_type : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_name : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status : {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue:0
      },
    },config);
    return SalesMarginGroup;
  };
  