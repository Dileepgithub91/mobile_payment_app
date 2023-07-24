const moment = require("moment");
const db = require("../../models");
const createSignature = require("./requestSignature");
const { client } = require("../../helpers");
const { QWIKCILVER_ENDPOINT } = require("../../core/constants");

//Create Main Model
const apiProviderSetting = db.api_provider_setting;

const generateNewToken = async (savedToken) => {
  /////Verify client
  const headers1 = {
    clientId: savedToken.client_id,
    username: savedToken.user_name,
    password: savedToken.user_password,
  };

  const url1 = `${QWIKCILVER_ENDPOINT}/oauth2/verify`;
  const verifyResponse = await client.get(url1, headers1);
  /////Verify client
  const headers2 = {
    clientId: savedToken.client_id,
    clientSecret: savedToken.client_secret,
    authorizationCode: verifyResponse.data.authorizationCode,
  };
  const url2 = `${QWIKCILVER_ENDPOINT}/oauth2/token`;

  const response = await client.get(url2, headers2);
  return response.data.token;
};

//generate token
const generateTokens = async (data, url, getORPost) => {
  try {
    const startDate = moment(new Date());
    const getToken = await apiProviderSetting.findAll({
      where: {
        provider: "qwikcilver",
      },
    });
    const endDate = moment(getToken[0].token_expiry_date);
    const diffInDays = endDate.diff(startDate, "days");
    if (diffInDays < 0) {
      return {
        dateAtClient: datetime.datetime
          .now()
          .astimezone()
          .replace((microsecond = 0))
          .isoformat(),
        Authorization: `Bearer ${getToken[0].dataValues.access_token} `,
        signature: createSignature(data, url, getORPost,getToken[0].client_secret),
        "Content-Type": "application/json",
      };
    }
    const response = await generateNewToken(getToken[0].dataValues);

    await apiProviderSetting.update(
      {
        access_token: response.data.accessToken,
        token_expiry_date: new Date().toISOString(),
      },
      {
        where: {
          provider: "qwikcilver",
        },
      }
    );
    return {
      dateAtClient: datetime.datetime
        .now()
        .astimezone()
        .replace((microsecond = 0))
        .isoformat(),
      Authorization: `Bearer ${response.data.accessToken} `,
      signature: createSignature(data, url, getORPost,getToken[0].client_secret),
      "Content-Type": "application/json",
    };
  } catch (e) {
    if (e.error == "FORBIDDEN" && e.status == "403") {
      throw new Error(
        "Service is not available now, try again after some time!"
      );
    }
    console.log(e);
    throw new Error("An Error Occured,contact your provioder!!");
  }
};

//Get category
const getCategories = async () => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Categories fetched SuccessFully!",
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
      message: "Categories fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Product List
const getProductList = async (categoryId, offset = null, limit = null) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Product List fetched SuccessFully!",
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
      message: "Product List fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Product Details
const getProductDetails = async (productId) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/catalog/products/${productId}`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Product Deatils fetched SuccessFully!",
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
      message: "Product Deatils fetched Failed, try again!",
      data: e,
    };
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
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Beneficiary Validation fetched SuccessFully!",
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
      message: "Beneficiary Validation fetched Failed, try again!",
      data: e,
    };
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
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Beneficiary Validation fetched SuccessFully!",
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
      message: "Beneficiary Validation fetched Failed, try again!",
      data: e,
    };
  }
};

//Create an order api
const createAnOrderApi = async (
  address,
  billing,
  isConsolidated,
  payments,
  orderType,
  refno,
  remarks,
  deliveryMode,
  egvDeliveryType,
  products,
  otp,
  coBrandImageId,
  cardnumber,
  outletName,
  shipping,
  syncOnly,
  couponCode,
  deliveryMode
) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders`;
    const body = {
      address: address,
      billing: billing,
      isConsolidated: isConsolidated,
      payments: payments,
      orderType: orderType,
      deliveryMode: deliveryMode,
      egvDeliveryType: egvDeliveryType,
      products: products,
      remarks: remarks,
      otp: otp,
      coBrandImageId: coBrandImageId,
      cardnumber: cardnumber,
      outletName: outletName,
      refno: refno,
      couponCode: couponCode,
      shipping: shipping,
      syncOnly: syncOnly,
      deliveryMode: deliveryMode,
    };
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Creating Order fetched SuccessFully!",
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
      message: "Creating Order fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Order Details Api
const getOrderDetailsAPi = async (orderId) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/${orderId}`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order Deatils fetched SuccessFully!",
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
      message: "Order Deatils fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Order List Api
const getOrderListAPi = async () => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order List fetched SuccessFully!",
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
      message: "Order List fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Order Status Api
const getOrderStatusAPi = async (refno) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/order/${refno}/status`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Order Status fetched SuccessFully!",
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
      message: "Order Status fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Activated Card APi
const getActivatedCardApi = async (orderId, offset = null, limit = null) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/order/${orderId}/cards/?offset=${offset}&limit=${limit}`;
    const headers = await generateTokens("", url, get);
    const response = await client.get(url, headers);
    return {
      success: true,
      message: "Activated Card fetched SuccessFully!",
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
      message: "Activated Card fetched Failed, try again!",
      data: e,
    };
  }
};

//Get Activated Card APi
const getCardBalance = async (cardNumber, pin = null, sku = null) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/balance`;
    const body = {
      cardNumber: cardNumber,
      pin: pin,
      sku: sku,
    };
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Card balance fetched SuccessFully!",
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
      message: "Card balance fetched Failed, try again!",
      data: e,
    };
  }
};

// Order Resend APi
const orderResendAPi = async (incrementId, cards) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/${incrementId}/resend`;
    const body = { cards };
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Order Resend SuccessFully!",
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
      message: "Order Resend Failed, try again!",
      data: e,
    };
  }
};

//Order ReVerse Api
const orderReverseApi = async (
  address,
  billing,
  payments,
  refno,
  products,
  outletName,
  orderType,
  syncOnly,
  couponCode,
  deliveryMode
) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/orders/reverse`;
    const body = {
      address: address,
      billing: billing,
      payments: payments,
      refno: refno,
      products: products,
      outletName: outletName,
      orderType: orderType,
      shipping: shipping,
      syncOnly: syncOnly,
      couponCode: couponCode,
      deliveryMode: deliveryMode,
    };
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Order Reversed SuccessFully!",
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
      message: "Reverse Order Failed, try again!",
      data: e,
    };
  }
};

//Transection History
const transectionHistoryApi = async (startDate,endDate,limit,offset,cards) => {
  try {
    const url = `${QWIKCILVER_ENDPOINT}/rest/v3/transaction/history`;
    const body = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      limit: parseInt(limit),
      offset: parseInt(offset),
      cards: cards,
    };
    const headers = await generateTokens(body, url, get);
    const response = await client.post(url, body, headers);
    return {
      success: true,
      message: "Transection History fetched SuccessFully!",
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
      message: "Transection History Failed to fetch, try again!",
      data: e,
    };
  }
};

module.exports = {
  getCategories,
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
