const { surepassService } = require("../services");
const logger = require("../logger");

//Pan verification
const verifyPan = async (pan) => {
  try {
    const panData =await surepassService.verifyPan(pan);
    if(!panData.success){
        throw panData;
    }
    return panData
  } catch (error) {
    logger.log("info",error);
    throw error;
  }
};

///Aadhar Verification
const generateAadharOtp = async (aadhar) => {
  try {
    const response =await surepassService.generateAadharOtp(aadhar);
    if(!response.success){
        throw response;
    }
    return response
  } catch (error) {
    logger.log("info",error);
    throw error;
   };
};
const VerifyAadharOtp = async (ClientId, Otp) => {
  try {
    const response =await surepassService.VerifyAadharOtp(ClientId, Otp);
    if(!response.success){
        throw response;
    }
    return response
  } catch (error) {
    logger.log("info",error);
    throw error;
   };
};

///GST Verification
const verifyGst = async (gstNo) => {
  try {
    const response =await surepassService.verifyGst(gstNo);
    if(!response.success){
        throw response;
    }
    return response
  } catch (error) {
    logger.log("info",error);
    throw error;
  }
};

module.exports = {
  verifyPan,
  generateAadharOtp,
  VerifyAadharOtp,
  verifyGst,
};
