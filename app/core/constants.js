module.exports.SUREPASS_ENDPOINT = "https://sandbox.surepass.io";
module.exports.DATAGENIT_ENDPOINT = "https://api.datagenit.com";
module.exports.PINEPERKS_ENDPOINT = "https://apiuat.pineperks.in";
module.exports.QWIKCILVER_ENDPOINT = "https://sandbox.woohoo.in";

exports.responseMessages = {
  invalidMobile: "Invalid Mobile Number!",
  userNotFound: "User not found.",
  userAdded: "User added successfully",
  userAlreadyExist: "User already Exists.",
  userNotAdded: "Unable to create user!! try later",
  userRemovedSuccessfully: "User removed successfully",
  userKycNotFound: "User Kyc Data not found.",
  passwordNotMatch: "Password does not match.",
  otpTryExceded: "You have exceeded no of tries for otp, you can resend otp.",
  otpInvalid: "Invalid Otp!, enter correct otp.",
  otpExpired: "You Otp  has Expired, please resend new otp!",
  phoneAlreadyExist: "Phone Already Exists.",
  dataNotFound: "Data Not Found.",
  gstInactive: "Gst is Inactive, gst verification failed.",
  emailAlreadyExist: "Email Already Exists.",
  incorrectCredentials: "Invalid Credentials",
  taskTimeout: "Unable to process your request!! Try later",
  taskCompleted: "Operation Completed Successfully",
  errorMessage: "Something Went Wrong",
  //business Request
  businessRequestNotFound:"Business Request not found",
  businessRequestVerifiedError:"Business Request is already verified!",
};

exports.responseFlags = {
  success: 200,
  failure: 400,
  forbidden:403,
  notFound: 404,
};
