const catchAsyncError = require('../middleware/catch.async.error');
const { marginValidator } = require('../validations');
const { response } = require('../helpers');
const logger = require('../logger');
const {
  salesMarginGroupServices,
  salesMarginServices,
  purchaseMarginServices,
} = require('../services');

///margin Group APi
const createMarginGroup = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.validateMarginGroup.validateAsync(
    req.body
  );
  ///update user
  const marginGroup = await salesMarginGroupServices.saveSalesMarginGroup({
    name: value.name,
    group_type: value.group_type,
    role: value.role,
    customer_name: value.customer_name,
    created_by: req.user.name,
  });

  response.success(res, 'New Margin Group Have been created!', marginGroup);
});

const editMarginGroup = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.EditMarginGroup.validateAsync(req.body);
  let id = value.id;
  delete value.id;
  ///update user
  const marginGroup = await salesMarginGroupServices.updateSalesMarginGroup(
    value,
    id
  );
  response.success(res, 'Margin Group Have been updated!', marginGroup);
});

const updateMarginGroupStatus = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.updateMarginGroupStatus.validateAsync(
    req.body
  );
  let id = value.id;
  delete value.id;
  ///update user
  const marginGroup = await salesMarginGroupServices.updateSalesMarginGroup(
    { status: value.status },
    id
  );
  response.success(res, 'MarginGroup Status updated!', marginGroup);
});

const getMarginGroup = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const marginGroups =
    await salesMarginGroupServices.getSalesMarginGroup(requestData);
  response.success(res, 'List of Margin Group!', marginGroups);
});

const getMarginGroupDetails = catchAsyncError(async (req, res, next) => {
  const value = await marginValidator.validateMarginGroupDetails.validateAsync(
    req.query
  );
  const marginGroup = await salesMarginGroupServices.getProviderDetails(
    value.id
  );
  response.success(res, 'Details Of Margin Group!', marginGroup);
});

///Sales margin APi
const createSalesMargin = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.validateSalesMargin.validateAsync(
    req.body
  );
  ///update user
  const salesMargin = await salesMarginServices.saveSalesMargin(value);
  response.success(res, 'New Sales Margin Have been created!', salesMargin);
});

const editSalesMargin = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.EditSalesMargin.validateAsync(req.body);
  let id = value.id;
  delete value.id;
  ///update user
  const salesMargin = await salesMarginServices.updateSalesMargin(value, id);
  response.success(res, 'Sales Margin Have been updated!', salesMargin);
});

const updateSalesMarginStatus = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.updateSalesMarginStatus.validateAsync(
    req.body
  );
  let id = value.id;
  delete value.id;
  ///update user
  const salesMargin = await salesMarginServices.updateSalesMargin(
    { status: value.status },
    id
  );
  response.success(res, 'Sales Margin Status updated!', salesMargin);
});

const getSalesMargin = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const salesMargin = await salesMarginServices.getSalesMargin(requestData);
  response.success(res, 'List of Sales Margin!', salesMargin);
});

const getSalesMarginDetails = catchAsyncError(async (req, res, next) => {
  const value = await marginValidator.validateSalesMarginDetails.validateAsync(
    req.query
  );
  const salesMargin = await salesMarginServices.getSalesMarginDetails(value.id);
  response.success(res, 'Details Of Sales Margin!', salesMargin);
});

///Purchse margin APi
const createPurchseMargin = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.validatePurchaseMargin.validateAsync(
    req.body
  );
  ///update user
  const purchaseMargin = await purchaseMarginServices.savePurchaseMargin(value);
  response.success(
    res,
    'New Purchase Margin Have been created!',
    purchaseMargin
  );
});

const editPurchseMargin = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.EditPurchaseMargin.validateAsync(
    req.body
  );
  let id = value.id;
  delete value.id;
  ///update user
  const purchaseMargin = await purchaseMarginServices.updatePurchaseMargin(
    value,
    id
  );
  response.success(res, 'Purchase Margin Have been updated!', purchaseMargin);
});

const updatePurchseMarginStatus = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await marginValidator.updatePurchaseMarginStatus.validateAsync(
    req.body
  );
  let id = value.id;
  delete value.id;
  ///update user
  const purchaseMargin = await purchaseMarginServices.updatePurchaseMargin(
    { status: value.status },
    id
  );
  response.success(res, 'Purchase Margin Status updated!', purchaseMargin);
});

const getPurchseMargin = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const purchaseMargins =
    await purchaseMarginServices.getPurchaseMargin(requestData);
  response.success(res, 'List of Purchase Margin!', purchaseMargins);
});

const getPurchseMarginDetails = catchAsyncError(async (req, res, next) => {
  const value =
    await marginValidator.validatePurchaseMarginDetails.validateAsync(
      req.query
    );
  const purchaseMargin = await purchaseMarginServices.getPurchaseMarginDetails(
    value.id
  );
  response.success(res, 'Details Of Purchase Margin!', purchaseMargin);
});

module.exports = {
  getMarginGroup,
  getMarginGroupDetails,
  updateMarginGroupStatus,
  editMarginGroup,
  createMarginGroup,
  ///salesMargin
  getSalesMarginDetails,
  getSalesMargin,
  updateSalesMarginStatus,
  editSalesMargin,
  createSalesMargin,
  //Purchase Margin
  getPurchseMarginDetails,
  getPurchseMargin,
  updatePurchseMarginStatus,
  editPurchseMargin,
  createPurchseMargin,
};
