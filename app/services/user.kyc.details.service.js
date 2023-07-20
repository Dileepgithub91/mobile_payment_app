const db = require("../models");

//Create Main Model
const userKycDetails = db.user_kyc_details;

const addUserKycDetails = async (body) => {
  try {
    const userId = body.user_id;
    let user = await userKycDetails.findAll({
      where: { user_id: userId },
    });
    if (user.length == 0) {
      user = await userKycDetails.create(body);
    } else {
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
