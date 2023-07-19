const db = require("../models");

//Create Main Model
const users = db.users;
const userToken = db.user_token;

const addUser = async (body) => {
  try {
    const mobileNo = body.mobile_no;
    const user = await users.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    if (user.length == 0) {
      body.user_id = Math.floor(1000 + Math.random() * 9000);
      body.role = "user";
      body.status = "Inactive";
      user = await users.create(body);
    } else {
      delete body.mobile_no;
      user = await users.update(body, {
        where: {
          mobile_no: mobileNo,
        },
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (updatebody, userID) => {
  try {
    const user = await users.update(updatebody, {
      where: { user_id: userID },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUserId = async (userID) => {
  try {
    const getuser = await users.findAll({
      where: {
        user_id: userID,
      },
    });
    const getToken = await userToken.findAll({
      where: {
        user_id: userID,
      },
    });
    return { user: getuser[0].dataValues, token: getToken[0].dataValues };
  } catch (error) {
    throw error;
  }
};
const getUserByMobile = async (mobileNO) => {
  try {
    const user = await users.findAll({
      where: {
        mobile_no: mobileNO,
      },
    });
    return user[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  getUserByUserId,
  getUserByMobile,
  updateUser,
};
