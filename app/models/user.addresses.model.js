module.exports = (sequelize, DataTypes) => {
  const user_addresses = sequelize.define("user_addresses", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_type: {
      type: DataTypes.ENUM('user_address', 'business_address'),
      defaultValue: 'user_address',
      allowNull: true,
    },
    address_line_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_line_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    county_id: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return user_addresses;
};
