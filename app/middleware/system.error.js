const ErrorHandler = require("../helpers/error.handler");
const logger = require("../logger");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  logger.log("error",{message:err.message ,error:err})
  //Wrong MongoDb Error
  if (err.name == "CasteError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const messsage = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(messsage, 400);
  }

  //Wrong JWT token error
  if (err.name == "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT token Expire error
  if (err.name == "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    // error: err.stack,
    message: err.message,
  });
};
//use err only in error of res but in case err.stack it provides all the path of error
//if you want message then use message insted error and provide err.message
