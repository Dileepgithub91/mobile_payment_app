const db = require("../models");

//Create Main Model
const users = db.users;
const userToken =db.user_token;

const addUser = async (body) => {
  try {
    body.user_id= Math.floor(1000 + Math.random() * 9000);
    body.role="user";
    body.status="active";
    const user = await users.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (updatebody,userID) => {
  try {
    const user = await users.update(updatebody, {
      where: { user_id: userID }
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
    const token = await userToken.findAll({
      where: {
        user_id: userID,
      },
    });
    console.log(getuser[0]);
    console.log(token);
    return {user:getuser[0],token};
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
  updateUser
};
