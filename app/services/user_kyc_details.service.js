const db = require("../models");

//Create Main Model
const userKycDetails = db.user_kyc_details;

const addUserKycDetails = async (body) => {
  try {
    const user = await userKycDetails.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserKycDetailsByUserId = async (userId) => {
  try {
    const user = await userKycDetails.findAll({
      where:{
        user_id:userId
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserKycDetails,
  getUserKycDetailsByUserId
};
