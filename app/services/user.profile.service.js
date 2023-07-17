const db = require("../models");

//Create Main Model
const userProfile = db.user_profile;

const addUserProfile = async (body) => {
  try {
    const user = await userProfile.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};
const updateUserProfilebyUserID = async (bodyData,userId) => {
  try {
    const user = await userProfile.update(bodyData,{
      where:{
        user_id:userId
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserProfilebyUserID = async (userId) => {
  try {
    const user = await userProfile.findOne({
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
  addUserProfile,
  getUserProfilebyUserID,
  updateUserProfilebyUserID
};
