const db = require("../models");

//Create Main Model
const registration_verification = db.registration_verification;

const addRegistrationUser = async ({ mobileNo }) => {
  try {
    const passotp = Math.floor(100000 + Math.random() * 900000);
    const registeredUser = await registration_verification.create({mobile_no:mobileNo,otp:passotp});
    return registeredUser;
  } catch (error) {
    throw error;
  }
};
const findRegistrationUser = async (query) => {
  try {
    const user = await registration_verification.findAll({
      where:query
    });
    return user[0];
  } catch (error) {
    throw error;
  }
};
const updateRegistrationUser = async (updateBody,id) => {
  try {
    const user = await registration_verification.update(updateBody,{
      where:{
        id:id
      }
    });
    return user[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRegistrationUser,
  findRegistrationUser,
  updateRegistrationUser
};
