const { providerValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {providerServices} = require("../services");

const getProvider= async (req, res, next) => {
  try {
    const bodyData = req.query;
    let requestData={};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage ? (requestData.limitPerPage = bodyData.limitPerPage) : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const providers = await providerServices.getProvider(requestData);
    response.success(res, "List of Providers!", providers);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getProviderDetails = async (req, res, next) => {
  try {
    const value = await providerValidator.validateProviderDetails.validateAsync(req.query);
    const provider = await providerServices.getProviderDetails(value.id);
    response.success(res, "Details Of Providers!", provider);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
    getProvider,
    getProviderDetails
};
