
const { response } = require("../helpers");
const logger = require("../logger");
const { qwikCilverService } = require("../services");

const getCategories = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.getCategories();
    response.success(res, "categories have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getCategoriesdetails = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.getCategoriesDetails(req.body);
    response.success(res, "categories details have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getProductList = async (req, res, next) => {
  try {
    const products = await qwikCilverService.getProductList(req.body);
    response.success(res, "Product List have been fetched!", products);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getProductDetails = async (req, res, next) => {
  try {
    const product = await qwikCilverService.getProductDetails(req.body);
    response.success(res, "Product Details have been fetched!", product);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const bankBeneficiaryValidation = async (req, res, next) => {
  try {
    const beneficiary = await qwikCilverService.bankBeneficiaryValidation(req.body);
    response.success(res, "Bank Beneficiary validation!", beneficiary);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const upiBeneficiaryValidation = async (req, res, next) => {
  try {
    const beneficiary = await qwikCilverService.upiBeneficiaryValidation(req.body);
    response.success(res, "Upi Beneficiary validation!", beneficiary);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const createAnOrderForGiftCard = async (req, res, next) => {
  try {
    const cards = await qwikCilverService.createAnOrderApi(req.body);
    response.success(res, "New Gift Card Order Received!", cards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getOrderDetailsAPi = async (req, res, next) => {
  try {
    const orders = await qwikCilverService.getOrderDetailsAPi(req.body);
    response.success(res, "Order Details have been fetched!", orders);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getOrderListAPi = async (req, res, next) => {
  try {
    const orders = await qwikCilverService.getOrderListAPi();
    response.success(res, "Order List have been fetched!", orders);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getOrderStatusAPi = async (req, res, next) => {
  try {
    const order = await qwikCilverService.getOrderStatusAPi(req.body);
    response.success(res, "Order Status have been fetched!", order);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getActivatedCardApi = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.getActivatedCardApi(req.body);
    response.success(res, "Activated Card have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const getCardBalance = async (req, res, next) => {
  try {
    const card = await qwikCilverService.getCardBalance(req.body);
    response.success(res, "Card Balance have been fetched!", card);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const orderResendAPi = async (req, res, next) => {
  try {
    const order = await qwikCilverService.orderResendAPi(req.body);
    response.success(res, "Order have been resend!", order);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const orderReverseApi = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.orderReverseApi(req.body);
    response.success(res, "Reverse Order has been initiated!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};
const transectionHistoryApi = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.transectionHistoryApi(req.body);
    response.success(res, "Transection History have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  getCategories,
  getCategoriesdetails,
  getProductList,
  getProductDetails,
  bankBeneficiaryValidation,
  upiBeneficiaryValidation,
  createAnOrderForGiftCard,
  getOrderDetailsAPi,
  getOrderListAPi,
  getOrderStatusAPi,
  getActivatedCardApi,
  getCardBalance,
  orderResendAPi,
  orderReverseApi,
  transectionHistoryApi
};
