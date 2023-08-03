const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Product = db.Product;
const ProductPrice = db.ProductPrice;

const getCard = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const giftCard = await Product.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return giftCard;
  } catch (error) {
    logger.log("error",{source:"Card Service  -- get Card",error});
    throw error;
  }
};
const getCardDetails = async (card_id) => {
  try {
    const giftCard = await Product.findAll({
      where: {
        id:card_id
      }
    });
    return giftCard;
  } catch (error) {
    logger.log("error",{source:"Card Service  -- get Card details",error});
    throw error;
  }
};

module.exports = {
  getCard,
  getCardDetails
};
