const { cardValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const { giftCardServices} = require("../services");
 
const getCards = async (req, res, next) => {
  try {
    const bodyData = req.query;
    let requestData;
    body.pageNumber?requestData.pageNumber=body.pageNumber:{};
    body.limitPerPage?requestData.limitPerPage=body.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query=bodyData;
    const giftCards = await giftCardServices.getCard(requestData);
    response.success(res, "List of Gift Cards!", giftCards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getCardDetails = async (req, res, next) => {
  try {
    const value =
    await cardValidator.cardDetails.validateAsync(product);
    const giftCards = await giftCardServices.getCardDetails(value.id);
    response.success(res, "List of Gift Cards!", giftCards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  getCards,
  getCardDetails,
};
