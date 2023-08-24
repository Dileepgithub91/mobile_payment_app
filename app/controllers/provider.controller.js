const catchAsyncError=require('../middleware/catch.async.error');
const { providerValidator } = require("../validations");
const { response } = require("../helpers");
const {providerServices} = require("../services");

const getProvider= catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData={};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage ? (requestData.limitPerPage = bodyData.limitPerPage) : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const providers = await providerServices.getProvider(requestData);
    response.success(res, "List of Providers!", providers);
});

const getProviderDetails = catchAsyncError(async (req, res, next) => {
    const value = await providerValidator.validateProviderDetails.validateAsync(req.query);
    const provider = await providerServices.getProviderDetails(value.id);
    response.success(res, "Details Of Providers!", provider);
});

module.exports = {
    getProvider,
    getProviderDetails
};
