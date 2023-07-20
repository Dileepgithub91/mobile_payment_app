const db = require("../models");

//Create Main Model
const userProfile = db.user_profile;

const addUserProfile = async (body) => {
  try {
    const userID = body.user_id;
    let user = await userProfile.findAll({
      where: {
        user_id: userID,
      },
    });
    if (user.length == 0) {
      user = await userProfile.create(body);
    } else {
      delete body.user_id;
      user = await userProfile.update(body, {
        where: {
          user_id: userID,
        },
      });
    }

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
