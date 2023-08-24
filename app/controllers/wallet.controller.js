const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
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
    const wallet = await walletService.updateWallet({status:value.status}, req.user.id);
    response.success(res, "Wallet Status updated!", wallet);
});

const newUserActivateWallet = catchAsyncError(async (req, res, next) => {
    ///update Wallet status
    const wallet = await walletService.saveWallet({user_id:req.user.id});
    response.success(res, "new User Wallet Activated!", wallet);
});

const getWallets= catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData={};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage ? (requestData.limitPerPage = bodyData.limitPerPage) : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    requestData.query.user_id=req.user.id;
    const wallets = await walletService.getWallets(requestData);
    response.success(res, "List of Wallet!", wallets);
});

const getWalletsDetails = catchAsyncError(async (req, res, next) => {
    const wallet = await walletService.getWalletDetails(req.user.id);
    response.success(res, "Details Of Wallets!", wallet);
});

module.exports = {
    getWalletsDetails,
    getWallets,
    updateWalletStatus,
    editWallet,
    newUserActivateWallet
};
