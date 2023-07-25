
const { response } = require("../helpers");
const logger = require("../logger");
const { qwikCilverService } = require("../services");

const getCategories = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.getCategories();
    if(!categories.success){
      throw categories;
    }
    response.success(res, "categories have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getCategoriesdetails = async (req, res, next) => {
  try {
    const categories = await qwikCilverService.getCategoriesDetails(req.body);
    if(!categories.success){
      throw categories;
    }
    response.success(res, "categories details have been fetched!", categories);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};

const getProductList = async (req, res, next) => {
  try {
    const products = await qwikCilverService.getProductList(req.body);
    if(!products.success){
      throw products;
    }
    response.success(res, "Product List have been fetched!", products);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getProductDetails = async (req, res, next) => {
  try {
    const product = await qwikCilverService.getProductDetails(req.body);
    if(!product.success){
      throw product;
    }
    response.success(res, "Product Details have been fetched!", product);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const bankBeneficiaryValidation = async (req, res, next) => {
  try {
    const beneficiary = await qwikCilverService.bankBeneficiaryValidation(req.body);
    if(!beneficiary.success){
      throw beneficiary;
    }
    response.success(res, "Bank Beneficiary validation!", beneficiary);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const upiBeneficiaryValidation = async (req, res, next) => {
  try {
    const beneficiary = await qwikCilverService.upiBeneficiaryValidation(req.body);
    if(!beneficiary.success){
      throw beneficiary;
    }
    response.success(res, "Upi Beneficiary validation!", beneficiary);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const createAnOrderForGiftCard = async (req, res, next) => {
  try {
    const cards = await qwikCilverService.createAnOrderApi(req.body);
    if(!cards.success){
      throw cards;
    }
    response.success(res, "New Gift Card Order Received!", cards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getOrderDetailsAPi = async (req, res, next) => {
  try {
    const orders = await qwikCilverService.getOrderDetailsAPi(req.body);
    if(!orders.success){
      throw orders;
    }
    response.success(res, "Order Details have been fetched!", orders);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getOrderListAPi = async (req, res, next) => {
  try {
    const orders = await qwikCilverService.getOrderListAPi();
    if(!orders.success){
      throw orders;
    }
    response.success(res, "Order List have been fetched!", orders);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getOrderStatusAPi = async (req, res, next) => {
  try {
    const order = await qwikCilverService.getOrderStatusAPi(req.body);
    if(!order.success){
      throw order;
    }
    response.success(res, "Order Status have been fetched!", order);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getActivatedCardApi = async (req, res, next) => {
  try {
    const cards = await qwikCilverService.getActivatedCardApi(req.body);
    if(!cards.success){
      throw cards;
    }
    response.success(res, "Activated Card have been fetched!", cards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const getCardBalance = async (req, res, next) => {
  try {
    const card = await qwikCilverService.getCardBalance(req.body);
    if(!card.success){
      throw card;
    }
    response.success(res, "Card Balance have been fetched!", card);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const orderResendAPi = async (req, res, next) => {
  try {
    const order = await qwikCilverService.orderResendAPi(req.body);
    if(!order.success){
      throw order;
    }
    response.success(res, "Order have been resend!", order);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const orderReverseApi = async (req, res, next) => {
  try {
    const order = await qwikCilverService.orderReverseApi(req.body);
    if(!order.success){
      throw order;
    }
    response.success(res, "Reverse Order has been initiated!", order);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
  }
};
const transectionHistoryApi = async (req, res, next) => {
  try {
    const transections = await qwikCilverService.transectionHistoryApi(req.body);
    if(!transections.success){
      throw transections;
    }
    response.success(res, "Transection History have been fetched!", transections);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message,error);
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
