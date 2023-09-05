var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const States = sequelize.define("states", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fips_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iso2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wikiDataId: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },config);
    return States;
  };
  