const db = require("../models");

//Create Main Model
const BusinessRequest = db.BusinessRequest;
const BusinessAgreement=db.BusinessAgreement;
const CompanyUploadedAgreement = db.UploadedBusinessAgreement;

const addBusinessUserRequest = async (body) => {
  try {
    let customer;
    const mobileNO =body.mobile_no;
    let findCustomer = await BusinessRequest.findAll({
      where: {
        mobile_no: mobileNO,
      },
    });
    if(findCustomer.length==0){
      let savedCustomer = await BusinessRequest.create(body);
      customer =savedCustomer.dataValues;
    }else{
      customer=findCustomer[0].dataValues;
      delete body.mobile_no;
       await BusinessRequest.update(body,{
        where: {
          mobile_no: mobileNO,
        },
      })
    }
    
    return customer;
  } catch (error) {
    logger.log("error",{source:"Business User Service  -- add business user request",error});
    throw error;
  }
};

///Get Business Request
const getBusinessUserRequest= async (mobileNo) => {
  try {
    const customer = await BusinessRequest.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    return customer[0].dataValues;
  } catch (error) {
    logger.log("error",{source:"Business User Service  -- get business user request",error});
    throw new Error("Business Request Not Found!");
  }
};
////get business agreement list
const getBusinessAgreement= async (CompanyType) => {
  try {
    const agreement = await BusinessAgreement.findAll({
      where: {
        company_type: CompanyType,
      },
    });
    return agreement;
  } catch (error) {
    logger.log("error",{source:"Business User Service  -- get business aggrement list",error});
    throw error;
  }
};

//////Upload Business Agreement
const uploadBusinessAgreementDocument = async (body) => {
  try {
    const agreement = await CompanyUploadedAgreement.create(body);
    return agreement;
  } catch (error) {
    logger.log("error",{source:"Business User Service  -- Upload business aggrement",error});
    throw error;
  }
};
const getUploadedBusinessAgreementDocument= async (userId) => {
  try {
    const agreement = await CompanyUploadedAgreement.findAll({
      where: {
        user_id: userId,
      },
    });
    return agreement;
  } catch (error) {
    logger.log("error",{source:"Business User Service  -- get Uploaded business aggrement",error});
    throw error;
  }
};

module.exports = {
  addBusinessUserRequest,
  getBusinessUserRequest,
  getBusinessAgreement,
  uploadBusinessAgreementDocument,
  getUploadedBusinessAgreementDocument
};
