const db = require("../models");

//Create Main Model
const otp_verify = db.otp_verify;

const addVerificationOtp = async ({ mobile_no }) => {
  try {
    const passotp = Math.floor(100000 + Math.random() * 900000);
    const otpuser = await otp_verify.create({mobile_no:mobile_no,passotp:passotp});
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addVerificationOtp,
};
