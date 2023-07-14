const db = require("../models");

//Create Main Model
const userAddresses = db.user_addresses;

const addUserAddress = async (body) => {
  try {
    const user = await userAddresses.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUserAddress,
};
