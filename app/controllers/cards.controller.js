const { cardValidator } = require("../validations");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/errorhandler');
const { response } = require("../helpers");
const logger = require("../logger");
const { cardService} = require("../services");
 
const getCards = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData;
    body.pageNumber?requestData.pageNumber=body.pageNumber:{};
    body.limitPerPage?requestData.limitPerPage=body.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query=bodyData;
    const giftCards = await cardService.getCard(requestData);
    response.success(res, "List of Gift Cards!", giftCards);
});
const getCardDetails = catchAsyncError(async (req, res, next) => {
    const value =
    await cardValidator.cardDetails.validateAsync(product);
    const giftCards = await cardService.getCardDetails(value.id);
    response.success(res, "List of Gift Cards!", giftCards);
});

module.exports = {
  getCards,
  getCardDetails,
};
