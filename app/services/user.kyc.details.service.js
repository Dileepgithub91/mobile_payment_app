const db = require("../models");

//Create Main Model
const userKycDetails = db.UserKycDetail;
const KycAadharDetail = db.KycAadharDetail;
const KycPanDetail = db.KycPanDetail;
const KycGstDetail = db.KycGstDetail;

const addUserKycDetails = async (body) => {
  try {
    let user ;
    const userId = body.user_id;
    let finduser = await userKycDetails.findAll({
      where: { user_id: userId },
    });
     
    if (finduser.length == 0) {
      let savedUser = await userKycDetails.create(body);
      user =savedUser.dataValues;
    } else {
      user = finduser[0].dataValues;
      delete body.user_id;
      await userKycDetails.update(body, {
        where: { user_id: userId },
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};
const updateUserKycDetails = async (body, userId) => {
  try {
    const user = await userKycDetails.update(body, {
      where: { user_id: userId },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserKycDetailsByUserId = async (userId) => {
  try {
    const user = await userKycDetails.findOne({
      where: {
        user_id: userId,
      },
      include: [ KycAadharDetail,KycPanDetail, KycGstDetail],
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserKycDetails,
  getUserKycDetailsByUserId,
  updateUserKycDetails,
};
