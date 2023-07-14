const db = require("../models");

//Create Main Model
const userToken = db.user_token;

const addUserToken = async (body) => {
  try {
    const user = await userToken.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};
const findUserToken = async (body) => {
  try {
    const user = await userToken.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserToken,
  findUserToken,
};
