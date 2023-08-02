module.exports = (sequelize, DataTypes) => {
  const business_customer = sequelize.define("business_customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    request_type: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
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
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    services: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_address_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    business_address_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monthaly_turn_over: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "notVerified",
    },
  });
  return business_customer;
};
