const  surepassService  = require("./surepass.service");
const logger = require("../logger");
const db = require("../models");

//Create Main Model
const KycPanDetails = db.kyc_pan_detail;
const KycAadharDetails = db.kyc_pan_detail;
const KycGstDetails = db.kyc_gst_detail;

//Save Pan verification Data
const SavePanVerificationData = async (bodyData) => {
  try {
    const panData = await KycPanDetails.create(bodyData);
    return panData;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- SavePanVerificationData",error});
    throw error;
  }
};
const getPanVerificationData = async (userId) => {
  try {
    const panData = await KycPanDetails.findAll({
      where: {
        user_id: userId,
      },
    });
    return panData[0].dataValues;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- get Pan Verification Data",error});
    throw error;
  }
};

//Save Aadhar verification Data
const SaveAadharVerificationData = async (bodyData) => {
  try {
    const aadharData = await KycAadharDetails.create(bodyData);
    return aadharData;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- Save Aadhar Verification Data",error});
    throw error;
  }
};
const getAadharVerificationData = async (userId) => {
  try {
    const aadharData = await KycAadharDetails.findAll({
      where: {
        user_id: userId,
      },
    });
    return aadharData[0].dataValues;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- get Aadhar Verification Data",error});
    throw error;
  }
};

//Save GST verification Data
const SaveGSTVerificationData = async (bodyData) => {
  try {
    const gstData = await KycGstDetails.create(bodyData);
    return gstData;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- Save GST Verification Data",error});
    throw error;
  }
};
const getGSTVerificationData = async (userId) => {
  try {
    const gstData = await KycGstDetails.findAll({
      where: {
        user_id: userId,
      },
    });
    return gstData[0].dataValues;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- get GST Verification Data",error});
    throw error;
  }
};

//Pan verification
const verifyPan = async (pan) => {
  try {
    const panData = await surepassService.verifyPan(pan);
    if (!panData.success) {
      throw panData;
    }
    return panData;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- verify pan",error});
    throw error;
  }
};

///Aadhar Verification
const generateAadharOtp = async (aadhar) => {
  try {
    console.log(aadhar);
    const response =await surepassService.generateAadharOtp(aadhar);
    if (!response.success) {
      throw response;
    }
    return response;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- aadhar otp",error});
    throw error;
  }
};
const VerifyAadharOtp = async (ClientId, Otp) => {
  try {
    const response = await surepassService.VerifyAadharOtp(ClientId, Otp);
    if (!response.success) {
      throw response;
    }
    return response;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- aadhar otp verify",error});
    throw error;
  }
};

///GST Verification
const verifyGst = async (gstNo) => {
  try {
    const response = await surepassService.verifyGst(gstNo);
    if (!response.success) {
      throw response;
    }
    return response;
  } catch (error) {
    logger.log("error",{source:"Kyc Services  -- verify gst",error});
    throw error;
  }
};

module.exports = {
  verifyPan,
  generateAadharOtp,
  VerifyAadharOtp,
  verifyGst,
  SavePanVerificationData,
  getPanVerificationData,
  SaveAadharVerificationData,
  getAadharVerificationData,
  SaveGSTVerificationData,
  getGSTVerificationData,
};
