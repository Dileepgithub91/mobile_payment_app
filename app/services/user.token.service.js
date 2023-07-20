const db = require("../models");

//Create Main Model
const userToken = db.user_token;

const addUserToken = async (body) => {
  try {
    const userID = body.user_id;
    let finduser = await userToken.findAll({
      where: {
        user_id: userID,
      },
    });
    let user = finduser[0].dataValues;
    if (finduser.length == 0) {
      let savedUser = await userToken.create(body);
      user =savedUser.dataValues;
    } else {
      await userToken.update(
        {
          token: body.token,
        },
        {
          where: {
            user_id: userID,
          },
        }
      );
    }
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
