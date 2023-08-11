const cardService = require("./card.service");
const providerService = require("./provider.service");
const logger = require("../logger");

const checkProductAvailabilityAndPorviders = async (productId) => {
  try {
    ///no of providers
    //on which provider exists or not
    // whether the card is expired or not
    //check for providers
    //get product details and provider
    let product = await cardService.getCardDetails(productId);
    console.log(product);
    if (!product) {
      throw new Error("Product not found!");
    }
    //check error if product exists
    let providers = await providerService.getProviderDetails(
      product.provider_code
    );
    console.log(providers);
    return {
      provider: providers.name,
      product_code: product.product_code,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateCardListForPinePerks = async (value) => {
  try {
    return new Promise((resolve) => {
      let qty = parseInt(value.quantity);
      let customerList = [];

      console.log(qty);
      for (let i = 0; i < qty; i++) {
        let customerData = {
          recordIdentifier: "Row" + i,
          customerName: value.customer_name,
          mobileNumber: parseInt(value.customer_mobile),
          email: value.customer_email,
          amount: parseInt(value.amount),
          externalCardIdentifier: "abc00" + i,
        };
        customerList.push(customerData);
      }
      console.log(customerList);
      console.log("Resolved");
      resolve(customerList);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const savePurchasedCard = async (flowtype, data, value) => {
  try {
    console.log("purchased Api hit!")
    console.log(flowtype)
    console.log(data)
    console.log(value)
    if(flowtype == "qwikcilver"){
      let purchasedCard = await cardService.savePurchasedCard({
        order_id: data.data.refno,
        user_id: value.user_id,
        product_id: value.product_id,
        amount: value.amount,
        card_order_id:  data.data.orderId,
        customer_name: value.customer_name,
        customer_mobile: value.customer_mobile,
        customer_email: value.customer_email,
        response_message:  data.data.status,
      });
      // if(!purchasedCard){
        
      // }
    }
  if (flowtype == "pineperks") {
    if(data.cardDetailResponseList){
      await data.cardDetailResponseList.map(async(card)=>{
        await cardService.savePurchasedCard({
          order_id: data.externalRequestId,
          user_id: value.user_id,
          product_id: value.product_id,
          amount: card.amount,
          card_order_id: data.orderId,
          reference_number: "",
          serial_number: "",
          customer_name: card.customerName,
          customer_mobile: card.mobileNumber,
          customer_email: card.email,
          card_link: "",
          masked_card_number: "",
          approval_code: "",
          external_card_identifier: card.externalCardIdentifier,
          account_number: "",
          response_message: card.responseCode,
          response_code: card.responseMessage,
        });
      })
    }
    let purchasedCard = await cardService.savePurchasedCard({
      order_id: data.externalRequestId,
      user_id: value.user_id,
      product_id: value.product_id,
      amount: data.orderAmount,
      card_order_id: data.orderId,
      reference_number: data.referenceNumber,
      serial_number: data.serialNumber,
      customer_name: data.customerName,
      customer_mobile: data.mobileNumber,
      customer_email: data.email,
      card_link: data.cardLink,
      masked_card_number: data.maskedCardNumber,
      approval_code: data.approvalCode,
      external_card_identifier: data.externalCardIdentifier,
      account_number: data.accountNumber,
      response_message: data.responseCode,
      response_code: data.responseMessage,
    });
  }
  return true;
  } catch (error) {
    logger.log("error", { source: "Order Route Service  -- save purchased Card", error });
    return false;
  }
  
};

const updatePurchasedCardAndSaveActiveCard = async (flowtype, data, value) => {
  try {
      
  } catch (error) {
    logger.log("error", { source: "Order Route Service  -- update Purchased Card And Save Active Card", error });
    return false;
  }
  
};

module.exports = {
  checkProductAvailabilityAndPorviders,
  generateCardListForPinePerks,
  savePurchasedCard,
  updatePurchasedCardAndSaveActiveCard
};
