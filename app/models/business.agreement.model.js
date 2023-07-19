module.exports = (sequelize, DataTypes) => {
  const business_agreement = sequelize.define("business_agreement", {
    company_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agreement_document: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active"
    }
  });
  return business_agreement;
};
