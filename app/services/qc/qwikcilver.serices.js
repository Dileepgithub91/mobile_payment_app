const moment = require("moment");
const db = require("../../models");
const {qwikCilverErrorHandler} =require("../../helpers/apierror.handler");
const createSignature = require("./requestSignature");
const { client } = require("../../helpers");
const { QWIKCILVER_ENDPOINT } = require("../../core/constants");

//Create Main Model
const apiProviderSetting = db.api_provider_setting;

const generateNewToken = async (savedToken) => {
  /////Verify client
  let headers ={
    "Content-Type": "application/json"
  }
  let data = {
    clientId: savedToken.client_id,
    username: savedToken.user_name,
    password: savedToken.user_password,
  };
  const url1 = `${QWIKCILVER_ENDPOINT}/oauth2/verify`;
  const verifyResponse = await client.post(url1,data, headers);
  /////Verify client
   data = {
    clientId: savedToken.client_id,
    clientSecret: savedToken.client_secret,
    authorizationCode: verifyResponse.data.authorizationCode,
  };
  
  const url2 = `${QWIKCILVER_ENDPOINT}/oauth2/token`;

  const response = await client.post(url2,data, headers);
  return response.data.token;
};

//generate token
const generateTokens = async (data, url, getORPost) => {
  try {
    // const startDate = moment(new Date());
    // const getToken = await apiProviderSetting.findAll({
    //   where: {
    //     provider: "qwikcilver",
    //   },
    // });
    let getToken = [
      {
        dataValues: {
          id: 1,
          provider: "qwikcilver",
          user_name: "selectkaroapisandbox@woohoo.in",
          user_password: "woohoo123",
          access_token: "0",
          token_expiry_date: "0",
          client_id: "88d7346c8674587bc95f8fbde2e33acd",
          client_secret: "1a33c6118d1e0c74f7a012991d0e4e39",
          status: "active",
          createdAt: "2023-07-21T10:18:04.000Z",
          updatedAt: "2023-07-21T10:18:04.000Z",
        },
        _previousDataValues: {
          id: 1,
          provider: "qwikcilver",
          user_name: "selectkaroapisandbox@woohoo.in",
          user_password: "woohoo123",
          access_token: "0",
          token_expiry_date: "0",
          client_id: "88d7346c8674587bc95f8fbde2e33acd",
          client_secret: "1a33c6118d1e0c74f7a012991d0e4e39",
          status: "active",
          createdAt: "2023-07-21T10:18:04.000Z",
          updatedAt: "2023-07-21T10:18:04.000Z",
        },
      },
    ];
    // if (getToken.length == 0) {
    //   throw new Error("keys of api provider not found");
    // }
    // const endDate = moment(getToken[0].token_expiry_date);
    // const diffInDays = endDate.diff(startDate, "days");
    // if (diffInDays < 0) {
    //   console.log(
    //     createSignature(
    //       data,
    //       url,
    //       getORPost,
    //       getToken[0].dataValues.client_secret
    //     )
    //   );
    //   return {
    //     dateAtClient: moment().millisecond(0).toISOString(),
    //     Authorization: `Bearer ${getToken[0].dataValues.access_token} `,
    //     signature: createSignature(
    //       data,
    //       url,
    //       getORPost,
    //       getToken[0].dataValues.client_secret
    //     ),
    //     "Content-Type": "application/json",
    //   };
    // }
    const response = await generateNewToken(getToken[0].dataValues);
    // await apiProviderSetting.update(
    //   {
    //     access_token: response.data.accessToken,
    //     token_expiry_date: new Date().toISOString(),
    //   },
    //   {
    //     where: {
    //       provider: "qwikcilver",
    //     },
    //   }
    // );
    return {
      dateAtClient: moment().millisecond(0).toISOString(),
      Authorization: `Bearer ${response} `,
      signature: createSignature(
        data,
        url,
        getORPost,
        getToken[0].dataValues.client_secret
      ),
      "Content-Type": "application/json",
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      throw new Error(
        "Service is not available now, try again after some time!"
      );
    }
    throw {
      message: new Error("An Error Occured,contact your provioder!!"),
      data: e,
    };
  }
};

//Get category
const getCategories = async () => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Categories fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get category
const getCategoriesDetails = async ({ categoryId }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories/${categoryId}`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Categories details fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Product List
const getProductList = async ({ categoryId, offset = null, limit = null }) => {
  try {
    let url =`${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories/${categoryId}/products`;
    if(offset&&limit){
      url =`${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
    }
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Product List fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Product Details
const getProductDetails = async ({ productId }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/products/${productId}`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Product Deatils fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Beneficiary Validation API
const bankBeneficiaryValidation = async (
  type,
  accountNumber,
  ifscCode,
  email,
  name,
  telephone,
  refno
) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/beneficiaries/validations`;
    const body = {
      type: type,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
      email: email,
      name: name,
      telephone: telephone,
      refno: refno,
    };
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Beneficiary Validation fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Beneficiary Validation API
const upiBeneficiaryValidation = async (
  type,
  vpa,
  email,
  name,
  telephone,
  refno
) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/beneficiaries/validations`;
    const body = {
      type: type,
      vpa: vpa,
      email: email,
      name: name,
      telephone: telephone,
      refno: refno,
    };
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Beneficiary Validation fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Create an order api
const createAnOrderApi = async (bodyData) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders`;
    const body = bodyData;
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Creating Order fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Order Details Api
const getOrderDetailsAPi = async ({ orderId }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/${orderId}`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order Deatils fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Order List Api
const getOrderListAPi = async () => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order List fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Order Status Api
const getOrderStatusAPi = async ({ refno }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/order/${refno}/status`;
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order Status fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Activated Card APi
const getActivatedCardApi = async ({
  orderId,
  offset = null,
  limit = null,
}) => {
  try {
    let url = `${QWIKCILVER_ENDPOINT}/rest/v3/order/${orderId}/cards`;
    if(offset &&limit){
      url = `${QWIKCILVER_ENDPOINT}/rest/v3/order/${orderId}/cards/?offset=${offset}&limit=${limit}`;
    }
    
    const headers = await generateTokens("", url, "GET");
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Activated Card fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Get Activated Card APi
const getCardBalance = async ({ cardNumber, pin = null, sku = null }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/balance`;
    const body = {
      cardNumber: cardNumber,
      pin: pin,
      sku: sku,
    };
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Card balance fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

// Order Resend APi
const orderResendAPi = async ({ incrementId, cards }) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/${incrementId}/resend`;
    const body = { cards };
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Order Resend SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Order ReVerse Api
const orderReverseApi = async (bodyData) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/reverse`;
    const body = bodyData;
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Order Reversed SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error;
  }
};

//Transection History
const transectionHistoryApi = async ({
  startDate,
  endDate,
  limit,
  offset,
  cards,
}) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/transaction/history`;
    const body = {};
    startDate?body.startDate=new Date(startDate).toISOString():{}
    endDate?body.endDate= new Date(endDate).toISOString():{}
    limit?body.limit=parseInt(limit):{}
    offset?body.offset= parseInt(offset):{}
    body.cards= cards
    const headers = await generateTokens(body, url, "POST");
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Transection History fetched SuccessFully!",
      data: response.data,
    };
  } catch (e) {
    const error = qwikCilverErrorHandler(e);
    throw error; 
  }
};

module.exports = {
  getCategories,
  getCategoriesDetails,
  getProductList,
  getProductDetails,
  bankBeneficiaryValidation,
  upiBeneficiaryValidation,
  createAnOrderApi,
  getOrderDetailsAPi,
  getOrderListAPi,
  getOrderStatusAPi,
  getActivatedCardApi,
  getCardBalance,
  orderResendAPi,
  orderReverseApi,
  transectionHistoryApi,
};
