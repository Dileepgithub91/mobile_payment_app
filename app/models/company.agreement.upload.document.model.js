module.exports = (sequelize, DataTypes) => {
  const company_agreement_uploaded_document = sequelize.define("company_agreement_uploaded_document", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agreement_document_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploaded_agreement_document: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active"
    }
  });
  return company_agreement_uploaded_document;
};
