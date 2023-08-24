const db = require("../models");

//Create Main Model
const User = db.User;
const userProfile = db.UserProfile;
const Wallet = db.Wallet;
const UserAddress = db.UserAddress;
const UserKycDetails = db.UserKycDetail;

const addUserProfile = async (body) => {
  try {
    let user;
    const userID = body.user_id;
    let finduser = await userProfile.findAll({
      where: {
        user_id: userID,
      },
    });
   
    if (finduser.length == 0) {
      let saveduser = await userProfile.create(body);
      user =saveduser.dataValues;
    } else {
      user = finduser[0].dataValues;
      delete body.user_id;
      await userProfile.update(body, {
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
    const user = await User.findOne({
      where:{
        id:userId
      },
      include: [ Wallet, userProfile,UserAddress,UserKycDetails ],
      attributes:{exclude:['password']}
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
