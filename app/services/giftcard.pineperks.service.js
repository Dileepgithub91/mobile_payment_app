const { pinePerksValidator } = require("../validations");
const pinePerkService = require("./pineperks.service");
const logger = require("../logger");
const db = require("../models");

//Create Main Model
// const KycPanDetails = db.kyc_pan_detail;

const getCardSchema = async () => {
  try {
    const cardSchema = await pinePerkService.getScheme();
    return cardSchema;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const issueInstantDigitalCard = async (reqBody) => {
  try {
    const value =
      pinePerksValidator.validateInstantDigital.validateAsync(reqBody);
    const card = await pinePerkService.InstantDigitalCardIssue(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const bulkDigitalCardIssue = async (reqBody) => {
  try {
    const value = await pinePerksValidator.validateBulkDigital.validateAsync(reqBody);
    const card = await pinePerkService.BulkDigitalIssue(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getCardOrderStatus = async (reqBody) => {
  try {
    const value =
      await pinePerksValidator.validateCardOrderStatus.validateAsync(reqBody);
    const card = await pinePerkService.GetCardOrderStatus(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};
const getCardBalance = async (reqBody) => {
  try {
    const value = await pinePerksValidator.validateCardbalance.validateAsync(reqBody);
    const card = await pinePerkService.GetCardBalance(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getCardDetails = async (reqBody) => {
  try {
    const value = await pinePerksValidator.validateCardbalance.validateAsync(reqBody);
    const card = await pinePerkService.GetCardDetails(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getCardTransectionHistory = async (reqBody) => {
  try {
    const value = await pinePerksValidator.validateCardbalance.validateAsync(reqBody);
    const card = await pinePerkService.GetCardTransectionHistory(value);
    return card;
  } catch (error) {
    logger.log("info", error); 
    throw error;
  }
};
const updateCardTransectionLimit = async (reqBody) => {
  try {
    const value =
    await pinePerksValidator.validateUpdateCardTransection.validateAsync(reqBody);
    const card = await pinePerkService.UpdateCardTransectionLimit(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const updateCustomerCardStatus = async (reqBody) => {
  try {
    const value =
    await pinePerksValidator.validateCustomerCardStatusUpdate.validateAsync(reqBody);
    const card = await pinePerkService.UpdateCustomerCardStatus(value);
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const updateCustomerCardStatusByAdmin = async (reqBody) => {
  try {
    const value =
    await pinePerksValidator.validateCustomerCardStatusUpdateByAdmin.validateAsync(reqBody);
    const card = await pinePerkService.UpdateCustomerCardStatusByAdmin(
      value
    );
    return card;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  getCardSchema,
  issueInstantDigitalCard,
  bulkDigitalCardIssue,
  getCardOrderStatus,
  getCardBalance,
  getCardDetails,
  getCardTransectionHistory,
  updateCardTransectionLimit,
  updateCustomerCardStatus,
  updateCustomerCardStatusByAdmin
};
