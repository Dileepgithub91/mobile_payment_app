const { response } = require("../helpers");
const logger = require("../logger");
const {
  pinePerkService
} = require("../services");

const getCardSchema = async (req, res, next) => {
  try {
    const cardSchema = await pinePerkService.getCardSchema();
    response.success(
      res,
      "Card Schema fetched!",
      cardSchema
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const saveNewInstantDigitalCard = async (req, res, next) => {
  try {
    const newCard = await pinePerkService.issueInstantDigitalCard(req.body);
    if(!newCard.success){
      throw newCard;
    }
    response.success(
      res,
      "New Instant Digital Card Created!",
      newCard
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const saveNewBulkDigitalCard = async (req, res, next) => {
  try {
    const newCard = await pinePerkService.bulkDigitalCardIssue(req.body);
    if(!newCard.success){
      throw newCard;
    }
    response.success(
      res,
      "New Bulk Digital Card Created!",
      newCard
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const getCardOrderStatus = async (req, res, next) => {
  try {
    const cardStatus = await pinePerkService.getCardOrderStatus(req.body);
    if(!cardStatus.success){
      throw cardStatus;
    }
    response.success(
      res,
      "Card Order Status Fetched!",
      cardStatus
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const getCardBalance = async (req, res, next) => {
  try {
    const cardStatus = await pinePerkService.getCardBalance(req.body);
    if(!cardStatus.success){
      throw cardStatus;
    }
    response.success(
      res,
      "Card Balance Fetched!",
      cardStatus
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const getCardDetails = async (req, res, next) => {
  try {
    const cardStatus = await pinePerkService.getCardDetails(req.body);
    if(!cardStatus.success){
      throw cardStatus;
    }
    response.success(
      res,
      "Card Details Fetched!",
      cardStatus
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const getCardTransectionHistory = async (req, res, next) => {
  try {
    const cardHistory = await pinePerkService.getCardTransectionHistory(req.body);
    if(!cardHistory.success){
      throw cardHistory;
    }
    response.success(
      res,
      "Card Transection History Fetched!",
      cardHistory
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const updateCardTransectionLimit = async (req, res, next) => {
  try {
    const cardHistory = await pinePerkService.updateCardTransectionLimit(req.body);
    if(!cardHistory.success){
      throw cardHistory;
    }
    response.success(
      res,
      "Card Transection limit updated!",
      cardHistory
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const updateCustomerCardStatus = async (req, res, next) => {
  try {
    const cardHistory = await pinePerkService.updateCustomerCardStatus(req.body);
    if(!cardHistory.success){
      throw cardHistory;
    }
    response.success(
      res,
      "Customer Card Status updated!",
      cardHistory
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const updateCustomerCardStatusByAdmin = async (req, res, next) => {
  try {
    const cardHistory = await pinePerkService.updateCustomerCardStatusByAdmin(req.body);
    if(!cardHistory.success){
      throw cardHistory;
    }
    response.success(
      res,
      "Customer Card Status updated by admin!",
      cardHistory
    );
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

module.exports={
  getCardSchema,
  saveNewInstantDigitalCard,
  saveNewBulkDigitalCard,
  getCardOrderStatus,
  getCardBalance,
  getCardDetails,
  getCardTransectionHistory,
  updateCardTransectionLimit,
  updateCustomerCardStatus,
  updateCustomerCardStatusByAdmin
}