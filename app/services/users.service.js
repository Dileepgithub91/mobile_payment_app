const db = require("../models");

//Create Main Model
const users = db.users;

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

module.exports = {
  addUser,
};
