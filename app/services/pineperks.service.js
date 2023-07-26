const moment = require("moment");
const db = require("../models");
const { client } = require("../helpers");
const env = require("../env");
const { PINEPERKS_ENDPOINT } = require("../core/constants");

//Create Main Model
const apiProviderSetting = db.api_provider_setting;

//generate token
const generateHeaders = async () => {
  try {
    const startDate = moment(new Date());
    // const getToken = await apiProviderSetting.findAll({
    //   where: {
    //     provider: "pineperks",
    //   },
    // });
    const getToken = [
      {
        dataValues: {
          id: 1,
          provider: "pineperks",
          user_name: "I/XXPYExw8z6P0Wm9LArNg==",
          user_password: "fb94c0b6d9db4aa1b41d4d95e718f5b7",
          access_token: "0",
          token_expiry_date: "0",
          client_id: "0",
          client_secret: "0",
          status: "active",
          createdAt: "2023-07-21T10:18:04.000Z",
          updatedAt: "2023-07-21T10:18:04.000Z",
        },
        _previousDataValues: {
          id: 1,
          provider: "pineperks",
          user_name: "I/XXPYExw8z6P0Wm9LArNg==",
          user_password: "fb94c0b6d9db4aa1b41d4d95e718f5b7",
          access_token: "0",
          token_expiry_date: "0",
          client_id: "0",
          client_secret: "0",
          status: "active",
          createdAt: "2023-07-21T10:18:04.000Z",
          updatedAt: "2023-07-21T10:18:04.000Z",
        },
      },
    ];
    // if(getToken.length==0){
    //   throw new Error("keys of api provider not found");
    // }
    // const endDate = moment(getToken[0].token_expiry_date);
    // const diffInDays = endDate.diff(startDate, "days");
    // if (diffInDays <0) {
    //   return {
    //     "X-PinePerks-UserName": getToken[0].user_name,
    //     "X-PinePerks-Token": getToken[0].access_token,
    //     "Content-Type": "application/json",
    //   };
    // }

    const headers = {
      "X-PinePerks-UserName": getToken[0].dataValues.user_name,
      "X-PinePerks-Token": getToken[0].dataValues.user_password,
      "Content-Type": "application/json",
    };

    const url = `${PINEPERKS_ENDPOINT}/auth/V2/generate/token`;
    const response = await client.get(url, headers);
    // await apiProviderSetting.update(
    //   { 
    //     access_token:response.data.accessToken,
    //     token_expiry_date:response.data.tokenExpiryDate
    //   },
    //   {
    //     where: {
    //       provider: "pineperks",
    //     },
    //   }
    // );
    return {
        "X-PinePerks-UserName": getToken[0].dataValues.user_name,
        "X-PinePerks-Token": response.data.accessToken,
        "Content-Type": "application/json",
      };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      throw new Error( "Service is not available now, try again after some time!" );
    }
    console.log(e);
    throw new Error("An Error Occured,contact your provioder!!");
  }
};
//Get Scheme
const getScheme = async () => {
  try {
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/config/V3/scheme`;
    const response = await client.get(url, headers);
    console.log(response);
    return {
      success: true,
      message: "Scheme fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Scheme fetched Failed, try again!",
      data: e,
    };
  }
};

//Instant Digital card Issue
const InstantDigitalCardIssue = async ({
  externalRequestId,
  cardSchemeId,
  customerName,
  mobileNumber,
  email,
  amount,
  externalCardIdentifier,
  orderDescription,
}) => {
  try {
    const data = {
      externalRequestId: externalRequestId,
      cardSchemeId: parseInt(cardSchemeId),
      customerName: customerName,
      mobileNumber: parseInt(mobileNumber),
      email: email,
      amount: parseInt(amount),
      externalCardIdentifier: externalCardIdentifier,
      orderDescription: orderDescription,
    };
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/order/V1/instant/issue/digital`;
    const response = await client.post(url, data, headers);
    if(response.data.responseCode!=304){
      throw response.data.responseMessage
    }
    return {
      success: true,
      message: "Instant Digital Card Isssued SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Instant Digital Card Isssue Failed, try again!",
      data: e,
    };
  }
};

//BulkDigital Issues
// [
//     {
//       recordIdentifier: "Row1",
//       customerName: "ABC",
//       mobileNumber: 9698765432,
//       email: "null1@gmail.com",
//       amount: 30000,
//       externalCardIdentifier: "abc343",
//     }
//   ],
const BulkDigitalIssue = async ({
  externalRequestId,
  cardSchemeId,
  cardDetailList,
  orderDescription,
}) => {
  try {
    const data = {
      externalRequestId: externalRequestId,
      cardSchemeId: parseInt(cardSchemeId),
      cardDetailList: cardDetailList,
      orderDescription: orderDescription,
    };
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/order/V1/bulk/issue/digital`;
    const response = await client.post(url, data, headers);
    return {
      success: true,
      message: "Bulk Digital Card Issued SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Bulk Digital Card Issue Failed, try again!",
      data: e,
    };
  }
};

//Get Card Order Status
const GetCardOrderStatus = async ({ requsetId }) => {
  try {
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}card/order/V2/status/${requsetId}`;
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "card Order Status fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "card Order Status fetching Failed, try again!",
      data: e,
    };
  }
};

//Get Card Balance
const GetCardBalance = async ({ giftCardId }) => {
  try {
    const headers = await generateHeaders();
    console.log(giftCardId);
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V1/balance/${giftCardId}`;
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Card Balance fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Card Balance Failed, try again!",
      data: e,
    };
  }
};

//Get Card Details
const GetCardDetails = async ({ giftCardId }) => {
  try {
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V1/attribute/${giftCardId}`;
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Card Balance fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Card Balance Failed, try again!",
      data: e,
    };
  }
};

//Get Card Transection History
const GetCardTransectionHistory = async ({ giftCardId }) => {
  try {
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V1/transaction/${giftCardId}`;
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Card Transection History fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Card Transection History Failed, try again!",
      data: e,
    };
  }
};

//Update Card Transection Limit
const UpdateCardTransectionLimit = async ({
  referenceNumber,
  isEcommTransactionEnabled,
  ecommTransactionLimit,
  isPOSTransactionEnabled,
  posTransactionLimit,
  isContactlessTransactionEnabled,
  contactlessTransactionLimit,
}) => {
  try {
    const data = {
      referenceNumber: referenceNumber,
      isEcommTransactionEnabled: isEcommTransactionEnabled,
      ecommTransactionLimit: ecommTransactionLimit,
      isPOSTransactionEnabled: isPOSTransactionEnabled,
      posTransactionLimit: posTransactionLimit,
      isContactlessTransactionEnabled: isContactlessTransactionEnabled,
      contactlessTransactionLimit: contactlessTransactionLimit,
    };
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V1/transaction/limit/update`;
    const response = await client.post(url, data, headers);
    return {
      success: true,
      message: "Card Transection limit Updated SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Card Transection limit Failed to updated, try again!",
      data: e,
    };
  }
};

//Customer Card Status Update APi
const UpdateCustomerCardStatus = async ({ referenceNumber, cardStatus }) => {
  try {
    const data = {
      referenceNumber: parseInt(referenceNumber),
      cardStatus: parseInt(cardStatus),
    };
    const headers =await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V2/customer/status/update`;
    const response = await client.post(url, data, headers);
    return {
      success: true,
      message: "Update Card Status Updated SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Update Card Status Failed to updated, try again!",
      data: e,
    };
  }
};

//Customer Card Status Update APi By Admin
const UpdateCustomerCardStatusByAdmin = async ({
  referenceNumber,
  cardStatus,
  reason,
}) => {
  try {
    const data = {
      referenceNumber: parseInt(referenceNumber),
      cardStatus: parseInt(cardStatus),
      reason: parseInt(reason),
    };
    const headers = await generateHeaders();
    const url = `${PINEPERKS_ENDPOINT}/card/profile/V2/admin/status/update`;
    const response = await client.post(url, data, headers);
    return {
      success: true,
      message: "Update Card Status Updated SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      return {
        success: false,
        message: "Service is not available now, try again after some time!",
      };
    }
    return {
      success: false,
      message: "Update Card Status Failed to updated, try again!",
      data: e,
    };
  }
};

module.exports = {
  getScheme,
  InstantDigitalCardIssue,
  BulkDigitalIssue,
  GetCardOrderStatus,
  GetCardBalance,
  GetCardDetails,
  GetCardTransectionHistory,
  UpdateCardTransectionLimit,
  UpdateCustomerCardStatus,
  UpdateCustomerCardStatusByAdmin,
};
