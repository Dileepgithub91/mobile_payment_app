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

module.exports = {
  addUserProfile,
};
