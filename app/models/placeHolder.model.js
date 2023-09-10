var config = {
    underscored: true,
};
module.exports = (sequelize, DataTypes) => {
  const PlaceHolder = sequelize.define("placeHolder", {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  },config);
  return PlaceHolder;
};
