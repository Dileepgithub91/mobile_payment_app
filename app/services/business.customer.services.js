const db = require("../models");

//Create Main Model
const businessCustomer = db.business_customer;
const businessAgreement=db.business_agreement;
const CompanyUploadedDocs = db.company_agreement_uploaded_document;

const addBusinessCustomerRequest = async (body) => {
  try {
    const mobileNO =body.mobileNo;
    const customer = await businessCustomer.findAll({
      where: {
        mobile_no: mobileNO,
      },
    });
    if(customer.length==0){
      customer = await businessCustomer.create(body);
    }else{
      delete body.mobileNo;
      customer = await businessCustomer.update(body,{
        where: {
          mobile_no: mobileNO,
        },
      })
    }
    
    return customer;
  } catch (error) {
    throw error;
  }
};

const getBusinessAgreement= async (CompanyType) => {
  try {
    const notes = await businessAgreement.findAll({
      where: {
        company_type: CompanyType,
      },
    });
    return notes;
  } catch (error) {
    throw error;
  }
};

//////Upload Business Agreement
const uploadBusinessAgreementDocument = async (body) => {
  try {
    const notes = await CompanyUploadedDocs.create(body);
    return notes;
  } catch (error) {
    throw error;
  }
};
const getBusinessAgreementDocument= async (user_id) => {
  try {
    const notes = await CompanyUploadedDocs.findAll({
      where: {
        user_id: user_id,
      },
    });
    return notes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBusinessCustomerRequest,
  getBusinessAgreement,
  uploadBusinessAgreementDocument,
  getBusinessAgreementDocument
};
