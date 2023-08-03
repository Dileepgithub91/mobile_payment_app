const qwikCilverService  = require("./qc/qwikcilver.serices");
const { qwikCilverValidator } = require("../validations");
const logger = require("../logger");
const db = require("../models");

//Create Main Model
// const KycPanDetails = db.kyc_pan_detail;
 
const getCategories = async () => {
  try {
    const card = await qwikCilverService.getCategories();
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get categories",error});
    throw error;
  }
};
const getCategoriesDetails = async (bodyData) => {
  try {
    const value =
      await qwikCilverValidator.getCategoryDetailsValidator.validateAsync(
        bodyData
      );
    const card = await qwikCilverService.getCategoriesDetails(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get categories details",error});
    throw error;
  }
};

const getProductList = async (bodyData) => {
  try {
    const value =
      await qwikCilverValidator.getCategoryDetailsValidator.validateAsync(
        bodyData
      );
    const card = await qwikCilverService.getProductList(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Product List",error});
    throw error;
  }
};
const getProductDetails = async (bodyData) => {
  try {
    const value =
      await qwikCilverValidator.getProductDetailsValidator.validateAsync(
        bodyData
      );
    const card = await qwikCilverService.getProductDetails(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Product Details",error});
    throw error;
  }
};
const bankBeneficiaryValidation = async (bodyData) => {
  try {
    const value =
      await qwikCilverValidator.getBankBenificiaryValidator.validateAsync(
        bodyData
      );
    const card = await qwikCilverService.bankBeneficiaryValidation(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Product Details",error});
    throw error;
  }
};

const upiBeneficiaryValidation = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.getUpiBenificiaryValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.upiBeneficiaryValidation(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- upi Beneficiary Validation",error});
    throw error;
  }
};

const createAnOrderApi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.newGiftCardOrderValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.createAnOrderApi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- create An Order Api",error});
    throw error;
  }
};
const getOrderDetailsAPi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.getOrderDetailsValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.getOrderDetailsAPi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Order Details APi",error});
    throw error;
  }
};
const getOrderListAPi = async () => {
  try {
    const card = await qwikCilverService.getOrderListAPi();
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Order List APi",error});
    throw error;
  }
};
const getOrderStatusAPi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.getOrderStatusValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.getOrderStatusAPi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- get Order Status APi",error});
    throw error;
  }
};

const getActivatedCardApi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.getOrderDetailsValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.getActivatedCardApi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- getActivatedCardApi",error});
    throw error;
  }
};
const getCardBalance = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.getCardBalanceValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.getCardBalance(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- getCardBalance",error});
    throw error;
  }
};

const orderResendAPi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.orderResendValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.orderResendAPi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- orderResendAPi",error});
    throw error;
  }
};
const orderReverseApi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.reverseOrderValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.orderReverseApi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- orderReverseApi",error});
    throw error;
  }
};
const transectionHistoryApi = async (bodyData) => {
  try {
    const value =
    await qwikCilverValidator.transectionHistoryValidator.validateAsync(
      bodyData
    );
    const card = await qwikCilverService.transectionHistoryApi(value);
    return card;
  } catch (error) {
    logger.log("error",{source:"QwikCilver Service  -- transectionHistoryApi",error});
    throw error;
  }
};

module.exports={
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
    transectionHistoryApi
}