const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Product = db.Product;
const ProductPrice = db.ProductPrice;

//Save Pan verification Data
const saveCard = async (bodyData) => {
  try {
    let card;
    ///find Card With Same name
    const findCard = await Product.findAll({
      where: {
        provider_code: bodyData.provider_code,
      },
    });
    if (findCard.length != 0) {
      card = findCard[0].dataValues;
      await Product.update(bodyData, {
        where: {
          id: card.id,
        },
      });
      return card;
    }
    card = await Product.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};
////updte card api
const updateCard = async (bodyData, card_id) => {
  try {
    const findCard = await Product.findAll({
      where: {
        id: card_id,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await Product.update(bodyData, {
      where: {
        id: card_id,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};

const getCard = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const giftCard = await Product.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return giftCard;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Card", error });
    throw error;
  }
};
const getCardDetails = async (cardId) => {
  try {
    const giftCard = await Product.findAll({
      where: {
        id: cardId,
      },
    });
    return giftCard;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Card details", error });
    throw error;
  }
};

module.exports = {
  getCard,
  getCardDetails,
  saveCard,
  updateCard,
};
