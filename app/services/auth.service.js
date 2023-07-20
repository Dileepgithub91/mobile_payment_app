const db = require("../models");

//Create Main Model
const registration_verification = db.registration_verification;

const addRegistrationUser = async ({ mobileNo }) => {
  try {
    const passotp = Math.floor(100000 + Math.random() * 900000);
    let findRegisteredUser = await registration_verification.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    let registeredUser = findRegisteredUser[0].dataValues;
    if (findRegisteredUser.length == 0) {
      let SavedRegisteredUser = await registration_verification.create({
        mobile_no: mobileNo,
        otp: passotp,
      });
      registeredUser = SavedRegisteredUser.dataValues;
    } else {
      await registration_verification.update(
        { mobile_no: mobileNo, otp: passotp },
        {
          where: {
            mobile_no: mobileNo,
          },
        }
      );
    }
    return registeredUser;
  } catch (error) {
    throw error;
  }
};
const findRegistrationUser = async (query) => {
  try {
    const user = await registration_verification.findAll({
      where: query,
    });
    return user[0];
  } catch (error) {
    throw error;
  }
};

const verifyRegistrationotp = async ({ mobileNo, otp }) => {
  try {
    const now = new Date().toISOString();
    const user = await registration_verification.findAll({
      where: {
        mobile_no: mobileNo,
      },
    });
    const registeredUser = user[0].dataValues;
    const blockedDate = new Date(registeredUser.blocked_untill);
    //check if the user has not been blocked besacuse of exceeded otp limit i.e. 3
    if (blockedDate >= now) {
      throw new Error("You have Used up your otp tries,try again later");
    }

    const updatedRetriesValue = parseInt(registeredUser.no_of_retries) + 1;
    //check if the otp is correct
    if (registeredUser.otp !== otp) {
      await authServices.updateRegistrationUser(
        { no_of_retries: updatedRetriesValue },
        registeredUser.id
      );
      throw new Error("Invalid Otp!, enter correct otp.");
    }
    //check if the user has not exceeded otp limit i.e. 3
    if (updatedRetriesValue >= 3) {
      await authServices.updateRegistrationUser(
        { no_of_retries: 0, blocked_untill: now },
        registeredUser.id
      );
      throw new Error(
        "You have exceeded no of tries for otp,you can try again tomorrow"
      );
    }
    return registeredUser;
  } catch (error) {
    throw error;
  }
};

const updateRegistrationUser = async (updateBody, id) => {
  try {
    console.log(id);
    const user = await registration_verification.update(updateBody, {
      where: {
        id: id,
      },
    });
    return user[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRegistrationUser,
  findRegistrationUser,
  updateRegistrationUser,
  verifyRegistrationotp,
};
