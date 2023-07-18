const passport = require("passport");
const { roles } = require("../../config/roles");
const responce =require("../helpers/response");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  if (err || !user) {
    return reject(new Error("Sorry, unauthorized")); 
  }
  // Remove password from user:
  delete user.password;
  req.user = user;

  if (rights.length) {
    const action = rights[0]; // createAny, readAny...
    const resource = rights[1];
    const permission = roles.can(req.user.role_id)[action](resource);
    if (!permission.granted) {
      return reject(
       new Error("Sorry, you don't have enough rights") 
        )
    }
    res.locals.permission = permission;
  }
  resolve();
};

const auth =
  (...rights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject,rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
