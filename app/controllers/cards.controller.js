const fs =require("fs");
const csvParser=require("fast-csv");
const { Worker, isMainThread, parentPort } = require('worker_threads');
const {QwikCilverWorker} =require("../workers/product.worker")
const { cardValidator } = require("../validations");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const ErrorHandler=require('../helpers/error.handler');
const { response } = require("../helpers");
const logger = require("../logger");
const { cardService,uploadedCardsService} = require("../services");
 
const getGiftCards = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData={};
    bodyData.pageNumber?requestData.pageNumber=bodyData.pageNumber:{};
    bodyData.limitPerPage?requestData.limitPerPage=bodyData.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    let giftCardQuery={
      category_id:1,
      sub_category_id:1,
      status:1
    }
    requestData.query={...bodyData,...giftCardQuery};
    const giftCards = await cardService.getCard(requestData);
    response.success(res, "List of Gift Cards!", giftCards);
});
const getPrePaidCards = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData={};
    bodyData.pageNumber?requestData.pageNumber=bodyData.pageNumber:{};
    bodyData.limitPerPage?requestData.limitPerPage=bodyData.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    let giftCardQuery={
      category_id:1,
      sub_category_id:2,
      status:1
    }
    requestData.query={...bodyData,...giftCardQuery};
    const giftCards = await cardService.getCard(requestData);
    response.success(res, "List of Gift Cards!", giftCards);
});
const getCardDetails = catchAsyncError(async (req, res, next) => {
    const value =
    await cardValidator.cardDetails.validateAsync(product);
    const giftCard = await cardService.getCardDetails(value.id);
    response.success(res, "List of Gift Cards!", giftCard);
});


//Uploaded Card Api

const bulkCreateUploadedCard= catchAsyncError(async (req, res, next) => {
  let filePath;
  if (req.files) {
    filePath = req.files.uploadedCsv[0].path;
  }
  const results = [];
  await fs
    .createReadStream(filePath)
    .pipe(csvParser.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", async (data) => results.push(data))
    .on("end", async (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      await Promise.all(
        results.map(async (student) => {
          await this.updateStudentFeeData(student, reqBody);
        })
      );
    });
  //validator
  const value = await cardValidator.validateSaveUploadedCard.validateAsync(req.body);
  let id = value.id;
  delete value.id;
  ///update user
  const card = await uploadedCardsService.saveUploadedCards(value, id);
  response.success(res, "Uploaded Card Have been updated!", card);
});

const createUploadedCard= catchAsyncError(async (req, res, next) => {
  //validator
  const value = await cardValidator.validateSaveUploadedCard.validateAsync(req.body);
  let id = value.id;
  delete value.id;
  ///update user
  const card = await uploadedCardsService.saveUploadedCards(value, id);
  response.success(res, "Uploaded Card Have been updated!", card);
});

const updateUploadedCard = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await cardValidator.validateEditUploadedCard.validateAsync(
    req.body
  );
  let id= value.id;
  delete value.id;
  ///update Uploaded Card status
  const card = await uploadedCardsService.updateUploadedCards(value,id);
  response.success(res, "Uploaded Card Status updated!", card);
});

const getUploadedCard= catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData={};
  body.pageNumber ? (requestData.pageNumber = body.pageNumber) : {};
  body.limitPerPage ? (requestData.limitPerPage = body.limitPerPage) : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  const cards = await uploadedCardsService.getUploadedCards(requestData);
  response.success(res, "List of Uploaded Card!", cards);
});

const getUploadedCardDetails = catchAsyncError(async (req, res, next) => {
  const value = await cardValidator.validateUploadedCardDetails.validateAsync(req.query);
  const card = await uploadedCardsService.getUploadedCardsDetails(value.id);
  response.success(res, "Details Of Uploaded Card!", card);
});



module.exports = {
  getGiftCards,
  getPrePaidCards,
  getCardDetails,
  ///Uploaded Card
  getUploadedCardDetails,
  getUploadedCard,
  updateUploadedCard,
  createUploadedCard
};
