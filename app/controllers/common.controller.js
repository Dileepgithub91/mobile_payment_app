const { response } = require("../helpers");
const logger = require("../logger");
const { commonService } = require("../services");

const getCountries = async (req, res, next) => {
  try {
    const Counteries = await commonService.getCounteries();
    response.success(res, "Counteries Lists!", Counteries);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};
const getStates = async (req, res, next) => {
  try {
    const counteryId = req.query.counteryId;
    if (counteryId == "" ||counteryId==null) {
      throw new Error("Countery id is required");
    }
    const States = await commonService.getStates(counteryId);
    response.success(res, "State Lists!", States);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};
const getCities = async (req, res, next) => {
  try {
    const counteryId = req.query.counteryId;
    const stateId = req.query.stateId;
    if (counteryId == "" ||counteryId==null ||stateId=="" ||stateId ==null) {
      throw new Error("Countery id and State id both are required!");
    }
    const Cities = await commonService.getCities(counteryId,stateId);
    response.success(res, "Cities Lists!", Cities);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
};

module.exports = {
  getCountries,
  getStates,
  getCities,
};
