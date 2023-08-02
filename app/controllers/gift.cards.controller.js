const { giftCardValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const { giftCardServices, qwikCilverService ,pinePerkService,userAddressServices} = require("../services");


const addNewGiftCardProduct = async (req, res, next) => {
  try {
      //validator
      const value =
        await giftCardValidator.verifynewGiftCardSingle.validateAsync(product);
      ///update user
      const giftCard = await giftCardServices.SaveGiftCardProducts({
        provider_code: value.provider_code,
        name: value.name,
        category_id:value.category_id,
        sub_category_id:value.sub_category_id,
        product_description:value.product_description,
        price_type: value.price_type,
        min_price: value.min_price,
        max_price: value.max_price,
        image: value.image,
      });
  
    response.success(res, "New Gift Cards Have been created!", );
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getGiftCardProducts = async (req, res, next) => {
  try {
    const bodyData = req.query;
    let requestData;
    body.pageNumber?requestData.pageNumber=body.pageNumber:{};
    body.limitPerPage?requestData.limitPerPage=body.limitPerPage:{};
    delete bodyData.pageNumber;
    delete bodyData.limitPerPage;
    requestData.query=bodyData;
    const giftCards = await giftCardServices.getGiftCardProducts(requestData);
    response.success(res, "List of Gift Card Products", giftCards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const generateNewGiftCardOrder = async (req, res, next) => {
  try {
    let orderData;
    const bodyData = req.query;
    let requestData;
    requestData.query={
      card_id:bodyData.cardId
    };
    const giftCards = await giftCardServices.getGiftCardProducts(requestData);
    if(giftCards.length==0){
      throw new Error("Gift Card Not Found!")
    }
    let cardData=giftCards[0].dataValues;
    let randomNum=Math.floor(100000 + Math.random() * 900000);
    let refernceNo="req"+randomNum;
    //////order
    if(cardData.card_source=="pineperks"){
       orderData =await pinePerkService.issueInstantDigitalCard({
        "externalRequestId": refernceNo,
        "cardSchemeId": bodyData.cardId,
        "customerName": "ABC",
        "mobileNumber": "9643170311",
        "email": "rh1@gmail.com",
        "amount": "1000",
        "externalCardIdentifier": "abc123",
        "orderDescription": null
      })
      logger.log(orderData);
      response.success(res, "new Gift Card Purchase SuccessFull!", orderData);
      return true;
    }else if(cardData.card_source=="qwikcilver"){
      const userAddress= await userAddressServices.getUserAddress(req.user.user_id);
       orderData =await qwikCilverService.createAnOrderApi(
        {
          "address": {
            "salutation": "Mr.",
            "firstname": "Jhon",
            "lastname": "Deo",
            "email": "jhon.deo@gmail.com",
            "telephone": "+919999999999",
            "line1": "address details1",
            "line2": "address details 2",
            "city": "bangalore",
            "region": "Karnataka",
            "country": "IN",
            "postcode": "560076",
            "gstn": "1234567890",
            "code": "123",
            "billToThis": true
          },
          "payments": [
            {
              "code": "svc",
              "amount": 1000
            }
          ],
          "products": [
            {
              "sku": bodyData.cardId,
              "price": 1000,
              "qty": 1,
              "currency": 356
            }
          ],
           "remarks": "Gift card",
            "otp": "12345",
          "refno": refernceNo,
          "syncOnly": false,
          "deliveryMode": "API"
        }
      )
      logger.log(orderData);
      response.success(res, "new Gift Card Purchase SuccessFull!", orderData);
      return true;
    }else{
      throw new Error("Card not found!");
    }
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  addNewGiftCardProduct,
  getGiftCardProducts,
  generateNewGiftCardOrder,
};
