const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Wallet = db.Wallet;

//Save Wallet
const saveWallet = async (bodyData) => {
  try {
    const findWallet = await Wallet.findAll({
      where: {
        id: bodyData.wallet_id,
      },
    });
    if (findWallet.length != 0) {
      throw new Error("Wallet Already Exists!!");
    }
    let wallet = await Wallet.create(bodyData);
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////update Wallet
const updateWallet = async (bodyData, walletId) => {
  try {
    const findWallet = await Wallet.findAll({
      where: {
        id: walletId,
      },
    });
    if (findOrder.length == 0) {
      throw new Error("Wallet Not Found!");
    }
    let wallet = await Wallet.update(bodyData, {
      where: {
        id: walletId
      },
    });
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Wallets fetch
const getWallets = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const wallet = await Wallet.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Wallet Details
const getWalletDetails = async (walletId) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        id: walletId,
      },
    });
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveWallet,
  updateWallet,
  getWallets,
  getWalletDetails
};
