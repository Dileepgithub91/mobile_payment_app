module.exports.SUREPASS_ENDPOINT = "https://sandbox.surepass.io";
module.exports.DATAGENIT_ENDPOINT = "https://api.datagenit.com";
module.exports.PINEPERKS_ENDPOINT = "https://apiuat.pineperks.in";
module.exports.QWIKCILVER_ENDPOINT = "https://sandbox.woohoo.in";

exports.responseMessages = {
  userNotFound: "User not found.",
  passwordNotMatch: "Password does not match.",
  otpTryExceded: "You have exceeded no of tries for otp, you can resend otp.",
  otpInvalid: "Invalid Otp!, enter correct otp.",
  userAlreadyExist: "User already Exists.",
  phoneAlreadyExist: "Phone Already Exists.",
  dataNotFound: "Data Not Found.",
  emailAlreadyExist: "Email Already Exists.",
  incorrectCredentials: "Invalid Credentials",
  taskTimeout: "Unable to process your request!! Try later",
  taskCompleted: "Operation Completed Successfully",
  userAdded: "User added successfully",
  userNotAdded: "Unable to create user!! try later",
  userRemovedSuccessfully: "User removed successfully",
  errorMessage: "Something Went Wrong",
};

exports.responseFlags = {
  success: 200,
  failure: 400,
  notFound: 404,
};
