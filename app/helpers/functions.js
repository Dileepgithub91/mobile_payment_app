const jwt = require("jsonwebtoken");

exports.genAuthToken = async (userId,deviceType,ipAddress) => {
  const userObj = { sub: userId ,deviceType:deviceType,ipAddress:ipAddress}; //dveice type
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};
