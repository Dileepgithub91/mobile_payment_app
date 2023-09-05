var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
    const Countery = sequelize.define("countries", {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iso3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numeric_code: {
        type: DataTypes.STRING,
        allowNull: true
      },
      iso2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phonecode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currency_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency_symbol: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tld: {
        type: DataTypes.STRING,
        allowNull: true
      },
      native: {
        type: DataTypes.STRING,
        allowNull: true
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true
      },
      timezones: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      translations: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emoji: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emojiU: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_at: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.STRING,
        allowNull: true
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: true
      },
      wikiDataId: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },config);
    return Countery;
  };
  