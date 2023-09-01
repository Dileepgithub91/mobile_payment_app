const { response } = require("../helpers");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const logger = require("../logger");
const { commonService } = require("../services");
const ErrorHandler = require("../helpers/error.handler");

const getCountries = catchAsyncError(async (req, res, next) => {
    const Counteries = await commonService.getCounteries();
    response.success(res, "Counteries Lists!", Counteries);
});
const getStates = catchAsyncError(async (req, res, next) => {
    const counteryId = req.query.counteryId;
    if (counteryId == "" ||counteryId==null) {
      throw new ErrorHandler("Countery id is required",400);
    }
    const States = await commonService.getStates(counteryId);
    response.success(res, "State Lists!", States);
});
const getCities = catchAsyncError(async (req, res, next) => {
    const counteryId = req.query.counteryId;
    const stateId = req.query.stateId;
    if (counteryId == "" ||counteryId==null ||stateId=="" ||stateId ==null) {
      throw new ErrorHandler("Countery id and State id both are required!",400);
    }
    const Cities = await commonService.getCities(counteryId,stateId);
    response.success(res, "Cities Lists!", Cities);
  
});

module.exports = {
  getCountries,
  getStates,
  getCities,
};
