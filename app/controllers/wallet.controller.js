const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/error.handler');
const { walletValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {walletService} = require("../services");


const editWallet= catchAsyncError(async (req, res, next) => {
    //validator
    const value = await walletValidator.saveWallet.validateAsync(req.body);
    let id = value.id;
    delete value.id;
    ///update user
    const wallet = await walletService.updateWallet(value, id);
    response.success(res, "Wallet Have been updated!", wallet);
});

const updateWalletStatus = catchAsyncError(async (req, res, next) => {
    //validator
    const value = await walletValidator.validateUpdateStatus.validateAsync(
      req.body
    );
    ///update Wallet status
    const wallet = await walletService.updateWallet({status:value.status}, value.id);
    response.success(res, "Wallet Status updated!", wallet);
});

const getWallets= catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData={};
    body.pageNumber ? (requestData.pageNumber = body.pageNumber) : {};
    body.limitPerPage ? (requestData.limitPerPage = body.limitPerPage) : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const wallets = await walletService.getWallets(requestData);
    response.success(res, "List of Wallet!", wallets);
});

const getWalletsDetails = catchAsyncError(async (req, res, next) => {
    const value = await walletValidator.validateWalletDetails.validateAsync(req.query);
    const wallet = await walletService.getWalletDetails(value.id);
    response.success(res, "Details Of Wallets!", wallet);
});

module.exports = {
    getWalletsDetails,
    getWallets,
    updateWalletStatus,
    editWallet
};
