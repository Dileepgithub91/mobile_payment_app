const { Worker, isMainThread, parentPort } = require('worker_threads');
const {QwikCilverWorker} =require("../workers/product.worker")
const { cardValidator } = require("../validations");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/error.handler');
const { response } = require("../helpers");
const logger = require("../logger");
const { cardService,qwikCilverService,pinePerkService} = require("../services");
 
const getGiftCards = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData;
    bodyData.pageNumber?requestData.pageNumber=bodyData.pageNumber:{};
    bodyData.limitPerPage?requestData.limitPerPage=bodyData.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    let giftCardQuery={
      category_id:1,
      sub_category_id:1
    }
    requestData.query={...bodyData,...giftCardQuery};
    const giftCards = await cardService.getCard(requestData);
    response.success(res, "List of Gift Cards!", giftCards);
});
const getPrePaidCards = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData;
    bodyData.pageNumber?requestData.pageNumber=bodyData.pageNumber:{};
    bodyData.limitPerPage?requestData.limitPerPage=bodyData.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    let giftCardQuery={
      category_id:1,
      sub_category_id:1
    }
    requestData.query={...bodyData,...giftCardQuery};
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
  getGiftCards,
  getPrePaidCards,
  getCardDetails
};
