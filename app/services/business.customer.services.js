const db = require("../models");

//Create Main Model
const businessCustomer = db.business_customer;
const businessAgreement=db.business_agreement;
const CompanyUploadedDocs = db.company_agreement_uploaded_document;

const addBusinessCustomerRequest = async (body) => {
  try {
    const mobileNO =body.mobile_no;
    let customer = await businessCustomer.findAll({
      where: {
        mobile_no: mobileNO,
      },
    });
    if(customer.length==0){
      customer = await businessCustomer.create(body);
    }else{
      delete body.mobile_no;
       await businessCustomer.update(body,{
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

///Get Business Request
const getBusinessCustomerRequest= async (mobileNo) => {
  try {
    const customer = await businessCustomer.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    return customer[0].dataValues;
  } catch (error) {
    throw new Error("Business Request Not Found!");
  }
};
////get business agreement list
const getBusinessAgreement= async (CompanyType) => {
  try {
    const agreement = await businessAgreement.findAll({
      where: {
        company_type: CompanyType,
      },
    });
    return agreement;
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
const getUploadedBusinessAgreementDocument= async (user_id) => {
  try {
    const notes = await CompanyUploadedDocs.findAll({
      where: {
        user_id: user_id,
      },
    });
    return notes;
  } catch (error) {
    throw new Error("Business Agreement Document Not Found!");
  }
};

module.exports = {
  addBusinessCustomerRequest,
  getBusinessCustomerRequest,
  getBusinessAgreement,
  uploadBusinessAgreementDocument,
  getUploadedBusinessAgreementDocument
};
