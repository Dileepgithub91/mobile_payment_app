const moment = require("moment");
const db = require("../models");

//Create Main Model
const OtpVerification = db.OtpVerification;

// validate otp before generation
const validateOtpExpireBeforeGeneration = async (registeredUser) => {
  const endDate = moment(new Date());
  const startDate = moment(registeredUser.createdAt);
  
  let retriesValue = parseInt(registeredUser.resend_tries);
   ///checking if blocked
  let blockDate = registeredUser.blocked_untill;
  if (blockDate) {
    let acBlockDate =moment(new Date(blockDate));
    let diffInDay = endDate.diff(acBlockDate, "hours");
    if(diffInDay<13){
      throw new Error("You have used up your otp limit, try again tomorrow!");
    }
  }
  ///Check no of tries
  if (retriesValue < 3 ) {
    retriesValue = retriesValue + 1;
  } else {
    await OtpVerification.update(
      {
        resend_tries: 0,
        blocked_untill: new Date().toISOString()
      },
      {
        where: {
          mobile_no: registeredUser.mobile_no,verification_type:registeredUser.verification_type

        },
      }
    );
    throw new Error("You have used up your otp limit, try again tomorrow!");
  }
 
  
  /// checking Expiration
  const diffInMinutes = endDate.diff(startDate, "minutes");
  if (diffInMinutes < 3) {
    return { otp: registeredUser.otp, retriesValue };
  }
  let otp = Math.floor(100000 + Math.random() * 900000);
  return { otp, retriesValue };
};

const addRegistrationUser = async ({ mobileNo ,verificationType}) => {
  try {
    let passotp;
    let registeredUser;
    let findRegisteredUser = await OtpVerification.findAll({
      where: {
        mobile_no: mobileNo,verification_type:verificationType
      },
    });
    if (findRegisteredUser.length == 0) {
      passotp = Math.floor(100000 + Math.random() * 900000);
      let SavedRegisteredUser = await OtpVerification.create({
        mobile_no: mobileNo,
        otp: passotp,
        verification_type:verificationType
      });
      registeredUser = SavedRegisteredUser.dataValues;
      return registeredUser;
    }
    registeredUser = findRegisteredUser ? findRegisteredUser[0].dataValues : "";
    passotp = await validateOtpExpireBeforeGeneration(registeredUser);
    await OtpVerification.update(
      {
        otp: passotp.otp,
        resend_tries: passotp.retriesValue,
        no_of_retries:"0",
      },
      {
        where: {
          mobile_no: mobileNo,verification_type:registeredUser.verification_type
        },
      }
    );
    return registeredUser;
  } catch (error) {
    logger.log("error",{source:"auth Service -- add registration user",error});
    throw error;
  }
};
const findRegistrationUser = async (query) => {
  try {
    const user = await OtpVerification.findAll({
      where: query,
    });
    return user[0];
  } catch (error) {
    logger.log("error",{source:"auth Service -- find registration user",error});
    throw error;
  }
};

const updateRegistrationUser = async (updateBody, query) => {
  try {
    const user = await OtpVerification.update(updateBody, {
      where: query,
    });
    return user[0];
  } catch (error) {
    logger.log("error",{source:"auth Service -- update registration user",error});
    throw error;
  }
};

module.exports = {
  addRegistrationUser,
  findRegistrationUser,
  updateRegistrationUser,
};
