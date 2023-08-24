const fs =require("fs");
const csvParser=require("fast-csv");
const { Worker, isMainThread, parentPort } = require('worker_threads');
const {QwikCilverWorker} =require("../workers/product.worker")
const { cardValidator } = require("../validations");
const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
const { response } = require("../helpers");
const logger = require("../logger");
const { cardService,cardProviderServices,uploadedCardsService,tempUploadedCardsService} = require("../services");
 
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
    await cardValidator.cardDetails.validateAsync(req.query);
    const giftCard = await cardService.getCardDetails(value.id);
    response.success(res, "List of Gift Cards!", giftCard);
});

////Temp Uploaded Card APi:
const bulkCreateTempUploadedCard = catchAsyncError(async (req, res, next) => {
    let filePath;
    let bodyData = req.body;
    const successRes = [];
    const errorRes = [];
    let userId = req.user.id;
    let providerId = req.user.role_id=="admin"?"3":"4";
    let formatId = bodyData.format_id;
    let batchProcessId = await helpFunc.generateDateTimeString();
    const cardFormat = await cardValidator.validateFormatId.validateAsync({
      format_id: formatId,
    });
    const cardFormatId = parseInt(cardFormat.format_id);
    if (req.files) {
      filePath = req.files.file_csv[0].path;
    }
    const dataList = await tempUploadedCardsService.parseCsvToGetArray(
      filePath
    );
    console.log("data list");
    console.log(dataList.length);
      dataList.forEach(async (card) => {
        card.format_id = cardFormatId.toString();
        card.product_id = "12";
        card.card_name = "testing card";
        //validator
        if (cardFormatId === 1) {
          value =
            await cardValidator.validateSaveUploadedCardFormat1.validateAsync(
              card
            );
        }
        if (cardFormatId === 2) {
          value =
            await cardValidator.validateSaveUploadedCardFormat2.validateAsync(
              card
            );
        }
        if (cardFormatId === 3) {
          value =
            await cardValidator.validateSaveUploadedCardFormat3.validateAsync(
              card
            );
        }
        if (cardFormatId === 4) {
          value =
            await cardValidator.validateSaveUploadedCardFormat4.validateAsync(
              card
            );
        }

        value.user_id = userId;
        value.provider_id = providerId;
        value.batch_process_Id = batchProcessId;
       

        const cards = tempUploadedCardsService.saveUploadedCardsTemp(value);
        if (cards.success) {
          successRes.push(cards);
        } else {
          errorRes.push(cards);
        }
      });

    await batchProcessService.saveBatchProcess({
      batch_process_id: batchProcessId,
      uuid: "uuid",
      file_path: filePath,
      total_card_count: dataList.length,
      error_card_count: errorRes.length,
      success_card_count: successRes.length,
    });
    console.log(successRes);
    console.log(errorRes);
    logger.log("info", { successRes, errorRes });
    response.success(res, "Uploaded Card Have been Saved!");
});

const createTempUploadedCard = catchAsyncError(async (req, res, next) => {
    let value = {};
    const cardFormat = await cardValidator.validateFormatId.validateAsync({
      format_id: req.body.format_id,
    });
    let cardFormatId = parseInt(cardFormat.format_id);
    //validator
    if (cardFormatId === 1) {
      value = await cardValidator.validateSaveUploadedCardFormat1.validateAsync(
        req.body
      );
    }
    if (cardFormatId === 2) {
      value = await cardValidator.validateSaveUploadedCardFormat2.validateAsync(
        req.body
      );
    }
    if (cardFormatId === 3) {
      value = await cardValidator.validateSaveUploadedCardFormat3.validateAsync(
        req.body
      );
    }
    if (cardFormatId === 4) {
      value = await cardValidator.validateSaveUploadedCardFormat4.validateAsync(
        req.body
      );
    }
    value.user_id = req.user.id;
    value.provider_id = req.user.role_id == "admin" ? "3" : "4";
    value.batch_process_Id = await helpFunc.generateDateTimeString();
    ///update user
    const card = await tempUploadedCardsService.saveUploadedCardsTemp(value);
    response.success(res, "temp Uploaded Card Have been Created!", card);
});
const updateTempUploadedCard = catchAsyncError(async (req, res, next) => {
    //validator
    let value;
    const valueID = await cardValidator.validateEditUploadedCard.validateAsync(
      req.body
    );
    let id = valueID.id;
    delete req.body.id;
    const cardFormat = await cardValidator.validateFormatId.validateAsync({
      format_id: valueID.format_id,
    });
    //validator
    if (parseInt(cardFormat.format_id) === 1) {
      value = await cardValidator.validateSaveUploadedCardFormat1.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 2) {
      value = await cardValidator.validateSaveUploadedCardFormat2.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 3) {
      value = await cardValidator.validateSaveUploadedCardFormat3.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 4) {
      value = await cardValidator.validateSaveUploadedCardFormat4.validateAsync(
        req.body
      );
    }
    ///update Uploaded Card status
    const card = await tempUploadedCardsService.updateUploadedCardsTemp(
      value,
      id
    );
    response.success(res, "temp Uploaded Card Status updated!", card);
});
const getTempUploadedCard = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData = {};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage
      ? (requestData.limitPerPage = bodyData.limitPerPage)
      : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const cards = await tempUploadedCardsService.getUploadedCardsTemp(
      requestData
    );
    response.success(res, "List of Uploaded Card!", cards);
});
const getTempUploadedCardDetails = catchAsyncError(async (req, res, next) => {
    const value = await cardValidator.validateCardDetails.validateAsync(
      req.query
    );
    const card = await tempUploadedCardsService.getUploadedCardsTempDetails(
      value.id
    );
    response.success(res, "Details Of Uploaded Card!", card);
});

////Uploaded Card APi:
const createUploadedCard = catchAsyncError(async (req, res, next) => {
    ///tempCardId
    let listCardId = req.body.tempCardId;
    let errorRes=[];
    let successRes=[];
    if(!listCardId || listCardId.length<1){
      throw new Error("Temp Uploaded card id is required");
    }
    listCardId.forEach(async(cardId)=>{
      const tempUploadedCard = await tempUploadedCardsService.getUploadedCardsTempById(cardId);
      if(!tempUploadedCard){
        errorRes.push({tempCardId:cardId,error:"card with this id not found!"});
      }
      const card = await uploadedCardsService.saveUploadedCard({
        batch_process_Id:tempUploadedCard.batch_process_Id , 
        user_id: tempUploadedCard.user_id, 
        product_id: tempUploadedCard.product_id,
        provider_id: tempUploadedCard.provider_id,
        format_id: tempUploadedCard.format_id,
        card_name: tempUploadedCard.card_name,
        card_no: tempUploadedCard.card_no,
        card_pin: tempUploadedCard.card_pin,
        card_otp_pin: tempUploadedCard.card_otp_pin,
        activation_code: tempUploadedCard.activation_code,
        activation_url:tempUploadedCard.activation_url ,
        barcode:tempUploadedCard.barcode,
        cvv_no: tempUploadedCard.cvv_no,
        balance:tempUploadedCard.balance,
        isuue_date: tempUploadedCard.isuue_date,
        expiry_date:tempUploadedCard.expiry_date
      });
      if(card.success){
        successRes.push({tempCardId:cardId,data:card});
      }else{
        errorRes.push({tempCardId:cardId,error:"error occured while saving card!"});
      }
    })
   
    response.success(res, "Uploaded Card Have been Created!", card);
});
const updateUploadedCard =catchAsyncError( async (req, res, next) => {
    //validator
    let value;
    const valueID = await cardValidator.validateEditUploadedCard.validateAsync(
      req.body
    );
    let id = valueID.id;
    delete req.body.id;
    const cardFormat = await cardValidator.validateFormatId.validateAsync({
      format_id: valueID.format_id,
    });
    //validator
    if (parseInt(cardFormat.format_id) === 1) {
      value = await cardValidator.validateSaveUploadedCardFormat1.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 2) {
      value = await cardValidator.validateSaveUploadedCardFormat2.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 3) {
      value = await cardValidator.validateSaveUploadedCardFormat3.validateAsync(
        req.body
      );
    }
    if (parseInt(cardFormat.format_id) === 4) {
      value = await cardValidator.validateSaveUploadedCardFormat4.validateAsync(
        req.body
      );
    }
    ///update Uploaded Card status
    const card = await uploadedCardsService.updateUploadedCard(value, id);
    response.success(res, "Uploaded Card Status updated!", card);
});
const getUploadedCard = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData = {};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage
      ? (requestData.limitPerPage = bodyData.limitPerPage)
      : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const cards = await uploadedCardsService.getUploadedCard(requestData);
    response.success(res, "List of Uploaded Card!", cards);
});
const getUploadedCardDetails = catchAsyncError(async (req, res, next) => {
    const value = await cardValidator.validateCardDetails.validateAsync(
      req.query
    );
    const card = await uploadedCardsService.getUploadedCardDetails(value.id);
    response.success(res, "Details Of Uploaded Card!", card);
});

///////Card Provider API
const getCardProviders = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData;
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage
      ? (requestData.limitPerPage = bodyData.limitPerPage)
      : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const giftCards = await cardProviderServices.getCardProvider(requestData);
    response.success(res, "List of Card Providers!", giftCards);
});

const getCardProviderDetails = catchAsyncError(async (req, res, next) => {
    const value = await cardValidator.cardDetails.validateAsync(req.query);
    const giftCards = await cardProviderServices.getCardProviderDetails(
      value.id
    );
    response.success(res, "List of Gift Cards!", giftCards);
});


//Card Format APi Api
const getCardFormat = catchAsyncError(async (req, res, next) => {
    const bodyData = req.query;
    let requestData = {};
    bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
    bodyData.limitPerPage
      ? (requestData.limitPerPage = bodyData.limitPerPage)
      : {};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query = bodyData;
    const cards = await uploadedCardsService.getCardFormat(requestData);
    response.success(res, "List of Card Fromat!", cards);
});
const getCardFormatDetails = catchAsyncError(async (req, res, next) => {
    const value = await cardValidator.validateCardDetails.validateAsync(
      req.query
    );
    const card = await uploadedCardsService.getUploadedCardsDetails(value.id);
    response.success(res, "Details Of Card Format!", card);
});




module.exports = {
  getGiftCards,
  getPrePaidCards,
  getCardDetails,
  ///Uploaded Card
  getUploadedCardDetails,
  getUploadedCard,
  updateUploadedCard,
  createUploadedCard,
  //temp Uploaded Card
  getTempUploadedCardDetails,
  getTempUploadedCard,
  updateTempUploadedCard,
  createTempUploadedCard,
  bulkCreateTempUploadedCard,
  //Card Provider Setting Api
  getCardProviders,
  getCardProviderDetails,
  // card format api
  getCardFormat,
  getCardFormatDetails
};
