const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Providers = db.Provider;

const getProvider = async () => {
  try {
    let providers = await Providers.findAll();
    return providers;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getProviderDetails = async (providerId) => {
  try {
    let provider = await Providers.findOne({
        where:{
            id:providerId
        }
    });
    return provider;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};



module.exports = {
    getProvider,
    getProviderDetails
  };
  