module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("cities", {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      state_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country_code: {
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
    });
    return City;
  };
  