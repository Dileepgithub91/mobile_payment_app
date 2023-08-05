const { Worker, isMainThread, parentPort } = require('worker_threads');
const cardWorker =require("../workers/product.worker")
const { cardValidator } = require("../validations");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/error.handler');
const { response } = require("../helpers");
const logger = require("../logger");
const { cardService,qwikCilverService,pinePerkService} = require("../services");

///auto fetch product ----depricated
const updateNewGiftCardProduct = async (req, res, next) => {
  try {
    if (isMainThread) {
    ///Qwick silver product api
    const products = await qwikCilverService.getProductList(req.query);
    if (!products.success) {
      responcesError.push(products);
    }
    if (products.data.products.length == 0) {
      responcesError.push("no Product Found!");
    }

    // Create a new worker thread
    const worker = new Worker(__filename);

    // Listen for messages from the worker thread
    worker.on('UpdateExternalApi', (result) => {
      response.success(res,"Operation successfull!!",result);
    });
    // Send a message to the worker thread
    worker.postMessage({ action: 'saveCard', qwikCilver: products.data.products });
  }else{
    // Worker thread code: Perform the actual computation
    parentPort.on('UpdateExternalApi', async(message) => {
      if (message.action === 'saveCard') {
        let qwikCilverRes = await cardWorker.QwikCilverWorker(message.qwikCilver);
        parentPort.postMessage(qwikCilverRes);
      }
    });
  }
  

    response.generalError(res, "an error occured!",)
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};
 
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
  updateNewGiftCardProduct
};
