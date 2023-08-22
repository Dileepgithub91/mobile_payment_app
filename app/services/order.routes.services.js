const cardService = require("./card.service");
const providerService = require("./card.provider.setting.service");
const uploadedCardService = require("./uploaded.card.service");
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
    let providers = await providerService.getCardProviderByProductId(productId);
    console.log(providers);
    return {
      provider: providers,
      product_code: product.product_code,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

///Deduct money from wallet and store in ledger
/**
 * check wallet money
 * if greater than sell_amount then deduct the money
 * save the ledger
 */
const deductMoneyAsOrderAmount = async (value) => {
  try {
    const wallet = await walletService.getWalletByUserId(value.user_id);
    console.log("wallet ways");
    console.log(wallet);
    const remainBalance =
      parseInt(wallet.dmt_wallet) - parseInt(value.sell_amount);
    if (remainBalance < 1) {
      throw new Error("Wallet balance not enough!");
    }
    let walletUpdateStatus = await walletService.updateWallet(
      { dmt_wallet: remainBalance },
      wallet.id
    );
    if (walletUpdateStatus && walletUpdateStatus[0] != 1) {
      throw new Error("Error occured when wallet was updated", 400);
    }
    ///save transection
    const transections = await walletService.saveTransection({
      user_id: value.user_id,
      order_id: order.order_id,
      transection_type: "dmt_transection",
      amount: value.sell_amount,
      before_amount: parseInt(wallet.dmt_wallet),
      current_amount: remainBalance,
    });
    console.log(transections);
    if (!transections) {
      throw new Error("Error occured, while saving transection.");
    }
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * in pine perk when purchesed in bulk we needs to gen customer list
 * this func does that
 */
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

const savePurchasedCardAndActiveCard = async (flowtype, data, value) => {
  try {
    console.log("purchased Api hit!");
    console.log(flowtype);
    console.log(data);
    console.log(value);
    if(flowtype=="admin"){
      const purchasedCard= await cardService.savePurchasedCard({
        order_id: value.order_id,
        user_id: value.user_id,
        product_id: value.product_id,
        amount: value.amount,
        card_order_id: data.id,
        customer_name: value.customer_name,
        customer_mobile: value.customer_mobile,
        customer_email: value.customer_email,
        response_message: "Delivered!",
      });
      let maskedCardNumber=`${data.card_no.slice(5)}********${data.card_no.slice(-5)}`;
      await cardService.saveActiveCard({
        ref_order_id: data.id,
        order_id: value.order_id,
        user_id: value.user_id,
        product_id: value.product_id,
        serialNumber: "0",
        referenceNumber: "0",
        card_link: data.activation_url,
        masked_card_no: maskedCardNumber,
        customer_name:value.customer_name,
        customer_email: value.customer_email,
        customer_mobile:value.customer_mobile,
        amount: data.balance,
        status: "Active",
      })
      return purchasedCard;
    }
    if (flowtype == "qwikcilver") {
      let purchasedCard = await cardService.savePurchasedCard({
        order_id: data.data.refno,
        user_id: value.user_id,
        product_id: value.product_id,
        amount: value.amount,
        card_order_id: data.data.orderId,
        customer_name: value.customer_name,
        customer_mobile: value.customer_mobile,
        customer_email: value.customer_email,
        response_message: data.data.status,
      });
      return purchasedCard;
    }
    if (flowtype == "pineperks") {
      let purchasedCard=[];
      if (data.cardDetailResponseList) {
        await data.data.cardDetailResponseList.map(async (card) => {
         let pCards= await cardService.savePurchasedCard({
            order_id: data.data.externalRequestId,
            user_id: value.user_id,
            product_id: value.product_id,
            amount: card.amount,
            card_order_id: data.data.orderId,
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
          purchasedCard.push(pCards);
        });
      }
      let pSCard = await cardService.savePurchasedCard({
        order_id: data.data.externalRequestId,
        user_id: value.user_id,
        product_id: value.product_id,
        amount: data.data.orderAmount,
        card_order_id: data.data.orderId,
        reference_number: data.data.referenceNumber,
        serial_number: data.data.serialNumber,
        customer_name: data.data.customerName,
        customer_mobile: data.data.mobileNumber,
        customer_email: data.data.email,
        card_link: data.data.cardLink,
        masked_card_number: data.data.maskedCardNumber,
        approval_code: data.data.approvalCode,
        external_card_identifier: data.data.externalCardIdentifier,
        account_number: data.data.accountNumber,
        response_message: data.data.responseMessage,
        response_code: data.data.responseCode,
      });
      purchasedCard.push(pSCard);
      if(data.responseCode=="0"&& data.responseMessage=="Success"){
        await cardService.saveActiveCard({
          ref_order_id:  data.data.orderId,
          order_id: data.data.externalRequestId,
          user_id: value.user_id,
          product_id: value.product_id,
          serialNumber:  data.data.serialNumber,
          referenceNumber:data.data.referenceNumber,
          card_link: data.data.cardLink,
          masked_card_no: data.data.maskedCardNumber,
          customer_name:data.data.customerName,
          customer_email: value.customer_email,
          customer_mobile:data.data.mobileNumber,
          amount: data.data.orderAmount,
          status: data.data.responseMessage,
        })
      }
      return purchasedCard;
    }
    throw new Error("Flow type not found!");
  } catch (error) {
    logger.log("error", {
      source: "Order Route Service  -- save purchased Card",
      error,
    });
    return false;
  }
};

/**
 * This Api if purchase flow
 * returns sucess:0 i.e failed
 * returns success:1 i.e complete success
 * returns success:2 i.e partial success i.e some card found but some not
 */
const userOrderFlow = async () => {
  try {
    return {
      success: "1",
      data,
    };
  } catch (error) {
    return {
      success: "0",
      error: error.message,
    };
  }
};

const adminOrderFlow = async (value) => {
  try {
    console.log(value);
    let cardList=[];
    let cardAvailable= parseInt(value.quantity);
    let requireMore=0;
    //loop to find all the cards available in uploads
    let cards = await uploadedCardService.getAllUploadedCard({product_id:value.product_id,sell_status:0},cardAvailable);
    if(cardAvailable<cards.length){
      requireMore =cardAvailable-cards.length;
    }
    for(let i=0;i<cardAvailable;i++){
      let currCard=cards[i];
      //save purchased card and active cards
       const purchesedCard=await this.savePurchasedCardAndActiveCard("admin",currCard,value);
       if(!purchesedCard){
        throw new Error("Error occured during Purchase and Active card generation!")
       }
       cardList.push(purchesedCard);
    }
    return {
      success: "1",
      data,
    };
  } catch (error) {
    return {
      success: "0",
      error: error.message,
    };
  }
};
const qwikcilverOrderFlow = async (value) => {
  try {
    console.log("qwikcilver hit");
    extOrderRes = await qwikCilverService.createAnOrderApi({
      address: {
        salutation: "Mr.",
        firstname: "Jhon",
        lastname: "Deo",
        email: "jhon.deo@gmail.com",
        telephone: "+919999999999",
        line1: "address details1",
        line2: "address details 2",
        city: "bangalore",
        region: "Karnataka",
        country: "IN",
        postcode: "560076",
        gstn: "1234567890",
        code: "123",
        billToThis: true,
      },
      payments: [
        {
          code: "svc",
          amount: value.sell_amount,
        },
      ],
      products: [
        {
          sku: provider.product_code,
          price: value.amount,
          qty: value.quantity,
          currency: 356,
        },
      ],
      remarks: "Gift card",
      otp: "12345",
      refno: order.order_id,
      syncOnly: false,
      deliveryMode: "API",
    });
    extCardOrderId = extOrderRes.data.orderId;
    console.log(extOrderRes);
    const purchasedCard = await this.savePurchasedCardAndActiveCard(
      "qwikcilver",
      extOrderRes,
      value
    );
    console.log(purchasedCard);
    return {
      success: "1",
      data,
    };
  } catch (error) {
    return {
      success: "0",
      error: error.message,
    };
  }
};
const pinePerksOrderFLow = async () => {
  try {
    console.log("pineperks hit");
    if (value.quantity != 1) {
      const customerList = await orderRouteService.generateCardListForPinePerks(
        value
      );
      extOrderRes = await pinePerkService.bulkDigitalCardIssue({
        externalRequestId: order.order_id,
        cardSchemeId: parseInt(provider.product_code),
        cardDetailList: customerList,
        orderDescription: null,
      });
    } else {
      extOrderRes = await pinePerkService.issueInstantDigitalCard({
        externalRequestId: order.order_id,
        cardSchemeId: provider.product_code.toString(),
        customerName: value.customer_name,
        mobileNumber: value.customer_mobile.toString(),
        email: value.customer_email,
        amount: value.amount.toString(),
        externalCardIdentifier: "abc123", //order  id
        orderDescription: null,
      });
    }
    extCardOrderId = extOrderRes.data.orderId;
    let purchasedCard = await this.savePurchasedCardAndActiveCard(
      "pineperks",
      extOrderRes,
      value
    );
    console.log(purchasedCard);
    return {
      success: "1",
      data,
    };
  } catch (error) {
    return {
      success: "0",
      error: error.message,
    };
  }
};
//Purchase Flow ends Here

const updatePurchasedCardAndSaveActiveCard = async (flowtype, data, value) => {
  try {
  } catch (error) {
    logger.log("error", {
      source:
        "Order Route Service  -- update Purchased Card And Save Active Card",
      error,
    });
    return false;
  }
};

module.exports = {
  checkProductAvailabilityAndPorviders,
  generateCardListForPinePerks,
  savePurchasedCardAndActiveCard,
  updatePurchasedCardAndSaveActiveCard,
  deductMoneyAsOrderAmount,
  qwikcilverOrderFlow,
  pinePerksOrderFLow,
  userOrderFlow,
  adminOrderFlow
};
