const db = require("../models");

//Create Main Model
const userRoles = db.UserRoles;

const addUserRoles = async (body) => {
  try {
    const title = body.title;
    let findRoles = await userRoles.findAll({
      where: {
        title: title,
      },
    });
    if (findRoles.length != 0) {
      throw new Error("Role Exists, try again!");
    }
    let roles = await userRoles.create(body);

    return roles;
  } catch (error) {
    throw error;
  }
};
const findUserRoles = async (id) => {
  try {
    let query = {};
    id ? (query.id = id) : {};
    let roles = await userRoles.findAll({
      where: query,
    });
    return roles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    addUserRoles,
    findUserRoles,
};
