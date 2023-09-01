const ErrorHandler = require("../helpers/error.handler");
const logger = require("../logger");

module.exports = (err, req, res, next) => {
  console.log(err);
  console.log(err.message);
  console.log(err.name);
  console.log("hit error");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  logger.log("error",{message:err.message ,error:err});

  //Wrong MongoDb Error
  if (err.name == "CasteError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Wrong DataBAse Error
  if (err.name == "SequelizeDatabaseError") {
    const message = err.message;
    err = new ErrorHandler(message, 400);
  }
  //Variable not defined
  if (err.name == "ReferenceError") {
    const message = `An Error Occured,Contact Your Provider!!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name == "Error") {
    const message = err.message;
    let stCode=err.statusCode||412;
    err = new ErrorHandler(message, stCode);
  }
  if (err.name == "ValidationError") {
    const message = err.message;
    let stCode=400;
    err = new ErrorHandler(message, stCode);
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
    error: err.stack,
    message: err.message,
    code:err.statusCode,
  });
};
//use err only in error of res but in case err.stack it provides all the path of error
//if you want message then use message insted error and provide err.message
