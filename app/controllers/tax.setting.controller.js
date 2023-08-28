const catchAsyncError = require("../middleware/catch.async.error");
const { response } = require("../helpers");
const { taxSettingService } = require("../services");

///get Tax Setting APi
const getTaxSettings = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const taxSettings = await taxSettingService.getTaxSetting(requestData);
  if (taxSettings == null) {
    throw new Error("Tax Setting not Found!");
  }
  response.success(res, "List of Tax Setting!", taxSettings);
});

///get Tax Setting Details APi
const getTaxSettingDetails = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const taxSettings = await taxSettingService.getTaxSetting(requestData);
  if (taxSettings == null) {
    throw new Error("Tax Setting not Found!");
  }
  response.success(res, "List of Tax Setting!", taxSettings);
});

module.exports = {
  getTaxSettings,
  getTaxSettingDetails,
};
