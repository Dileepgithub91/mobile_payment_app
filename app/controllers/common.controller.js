const { response } = require("../helpers");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/errorhandler');
const logger = require("../logger");
const { commonService } = require("../services");

const getCountries = catchAsyncError(async (req, res, next) => {
  try {
    const Counteries = await commonService.getCounteries();
    response.success(res, "Counteries Lists!", Counteries);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});
const getStates = catchAsyncError(async (req, res, next) => {
  try {
    const counteryId = req.query.counteryId;
    if (counteryId == "" ||counteryId==null) {
      return next(new ErrorHandler("Countery id is required", responseFlags.failure));
      // throw new Error("Countery id is required");
    }
    const States = await commonService.getStates(counteryId);
    response.success(res, "State Lists!", States);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});
const getCities = catchAsyncError(async (req, res, next) => {
  try {
    const counteryId = req.query.counteryId;
    const stateId = req.query.stateId;
    if (counteryId == "" ||counteryId==null ||stateId=="" ||stateId ==null) {
      return next(new ErrorHandler("Countery id and State id both are required.", responseFlags.failure));
      // throw new Error("Countery id and State id both are required!");
    }
    const Cities = await commonService.getCities(counteryId,stateId);
    response.success(res, "Cities Lists!", Cities);
  } catch (error) {
    logger.log("info", error.message);
    response.generalError(res, error.message);
  }
});

module.exports = {
  getCountries,
  getStates,
  getCities,
};
