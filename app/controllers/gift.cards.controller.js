const { giftCardValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const { giftCardServices, qwikCilverService } = require("../services");

const addNewGiftCardProduct = async (req, res, next) => {
  try {
    const responcesError=[];
    const responcesSuccess=[];
    const products = await qwikCilverService.getProductList(req.body);
    if (!products.success) {
      throw products;
    }
    if (products.data.products.length == 0) {
      throw new Error("new Product Found!");
    }
    await products.data.products.forEach(async (product) => {
      //validator
      const value =
        await giftCardValidator.verifynewGiftCardProduct.validateAsync(
          product
        );
      ///update user
      const giftCard = await giftCardServices.SaveGiftCardProducts({
        sku: value.sku,
        name: value.name,
        currency: value.currency,
        url: value.url,
        min_price: value.minPrice,
        max_price: value.maxPrice,
        price: value.price,
        images: value.images,
      });
      logger.log("info", giftCard);
      if(!giftCard.success){
        responcesError.push(giftCard.data);
      }else{
        responcesSuccess.push(giftCard.data);
      }
    });

    response.success(res, "New Gift Cards Have been created!", {responcesError,responcesSuccess});
  } catch (error) {
    logger.log("info", error);
    console.log(error);
    response.generalError(res, error.message);
  }
};

const getGiftCardProducts = async (req, res, next) => {
  try {
    const bodyData = req.query;
    const giftCards = await giftCardServices.getGiftCardProducts(bodyData);
    response.success(res, "List of Gift Card Products", giftCards);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  addNewGiftCardProduct,
  getGiftCardProducts,
};
