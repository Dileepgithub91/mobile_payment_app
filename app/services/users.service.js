const db = require("../models");

//Create Main Model
const users = db.User;
const userToken = db.UserToken;

const addUser = async (body) => {
  try {
    const mobileNo = body.mobile_no;
    let user;
    let finduser = await users.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    if (finduser.length === 0) {
      body.role = 1;
      body.status = 1;
      let saveduser = await users.create(body);
      user =saveduser.dataValues;
    } else {
      user =finduser[0].dataValues
       await users.update(
        {
          first_name: body.first_name,
          last_name:  body.last_name,
          password: body.password,
        },
        {
          where: {
            id: user.user_id,
          },
        }
      );
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (updatebody, userID) => {
  try {
    const user = await users.update(updatebody, {
      where: { id: userID },
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
        id: userID,
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
    const user = await users.findOne({
      where: {
        mobile_no: mobileNO,
      },
    });
    return user;
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
