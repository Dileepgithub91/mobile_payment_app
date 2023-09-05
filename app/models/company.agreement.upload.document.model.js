var config = {
  underscored: true,
};
module.exports = (sequelize, DataTypes) => {
  const companyAgreementUploadedDocument = sequelize.define("company_agreement_uploaded_document", {
    user_id: {
      type: DataTypes.INTEGER,
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
      defaultValue: "notVerified"
    }
  },config);
  return companyAgreementUploadedDocument;
};
