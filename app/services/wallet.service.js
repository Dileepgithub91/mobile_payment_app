const { responseFlags } = require("../core/constants");
const ErrorHandler = require("../helpers/error.handler");
const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Wallet = db.Wallet;
const Transection = db.Transection;

//Wallet api starts here

//Save Wallet
const saveWallet = async (bodyData) => {
  try {
    const findWallet = await Wallet.findOne({
      where: {
        user_id: bodyData.user_id,
      },
    });
    if (findWallet!=null) {
      return findWallet;
    }
    let wallet = await Wallet.create(bodyData);
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////update Wallet
const updateWallet = async (bodyData, UserId) => {
  try {
    const findWallet = await Wallet.findOne({
      where: {
        user_id: UserId,
      },
    });
    if (findWallet==null) {
      throw new ErrorHandler("Wallet Not Found!",responseFlags.notFound);
    }
    let wallet = await Wallet.update(bodyData, {
      where: {
        user_id: UserId
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
const getWalletDetails = async (userId) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        user_id:userId,
      },
    });
    if(wallet==null){
      throw new ErrorHandler("Wallet not Activated!",responseFlags.failure);
    }
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Wallet By User Id
const getWalletByUserId = async (userId) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        user_id: userId,
      },
    });
    return wallet;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Wallet api ends here

//Transection api starts here

//Save Transection
const saveTransection = async (bodyData) => {
  try {
    let transection = await Transection.create(bodyData);
    return transection;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////update Transection
const updateTransection = async (bodyData, transectionId) => {
  try {
    const findTransection = await Transection.findAll({
      where: {
        id: transectionId,
      },
    });
    if (findTransection.length == 0) {
      throw new ErrorHandler("Transection Not Found!",responseFlags.notFound);
    }
    let transection = await Transection.update(bodyData, {
      where: {
        id: transectionId
      },
    });
    return transection;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//get Transection
const getTransection = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const transection = await Transection.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return transection;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Transection Details
const getTransectionDetails = async (transectionId) => {
  try {
    const transection = await Transection.findOne({
      where: {
        id: transectionId,
      },
    });
    return transection;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Transection By User Id
const getTransectionByUserId = async (userId) => {
  try {
    const transection = await Transection.findOne({
      where: {
        user_id: userId,
      },
    });
    return transection;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveWallet,
  updateWallet,
  getWallets,
  getWalletDetails,
  getWalletByUserId,
  //Transections
  getTransectionByUserId,
  getTransectionDetails,
  getTransection,
  updateTransection,
  saveTransection
};
