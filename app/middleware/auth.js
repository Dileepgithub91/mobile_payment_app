const passport = require("passport");
const { roles } = require("../../config/roles");
const responce =require("../helpers/response");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  console.log(err);
  console.log(user);

  if (err || !user) {
    return reject(new Error("Sorry, unauthorized")); 
  }
  // req.user = {
  //   id: user.id,
  //   email: user.email,
  //   role: user.role,
  // };

  // if (rights.length) {
  //   const action = rights[0]; // createAny, readAny...
  //   const resource = rights[1];
  //   const permission = roles.can(req.user.role)[action](resource);
  //   if (!permission.granted) {
  //     return reject(
  //       new ApiError(
  //         httpStatus.FORBIDDEN,
  //         "Sorry, you don't have enough rights"
  //       )
  //     );
  //   }
  //   res.locals.permission = permission;
  // }
  resolve();
};

const auth =
  () =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      console.log("authentication started");
      console.log(`authentication ${req.user}`);
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
