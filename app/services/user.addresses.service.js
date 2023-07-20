const db = require("../models");

//Create Main Model
const userAddresses = db.user_addresses;

const addUserAddress = async (body) => {
  try {
    const userId = body.user_id;
    let user = await userAddresses.findAll({
      where: { user_id: userId ,address_type: "user_address"},
    });
    if (user.length == 0) {
      user = await userAddresses.create(body);
    } else {
      delete body.user_id;
      await userAddresses.update(body, {
        where: { user_id: userId },
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserAddress = async (bodyData, userId) => {
  try {
    const user = await userAddresses.update(bodyData, {
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
  addUserAddress,
  updateUserAddress,
};
