const db = require("../models");

//Create Main Model
const userAddresses = db.user_addresses;

const addUserAddress = async (body) => {
  try {
    let user;
    const userId = body.user_id;
    let finduser = await userAddresses.findAll({
      where: { user_id: userId ,address_type: "user_address"},
    });
    if (finduser.length == 0) {
      let saveduser = await userAddresses.create(body);
      user=saveduser.dataValues;
    } else {
      user = finduser[0].dataValues;
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
