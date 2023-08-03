const logger = require("../logger");
const db = require("../models");

//Create Main Model
const giftCardProducts = db.products;

//Save Pan verification Data
const saveCard = async (bodyData) => {
  try {
    let giftCard;
    const findGiftCard = await giftCardProducts.findAll({
      where: {
        name: bodyData.name,
      },
    });
    if (findGiftCard.length != 0) {
      giftCard = findGiftCard[0].dataValues;
      await giftCardProducts.update(bodyData, {
        where: {
          id: giftCard.id,
        },
      });
      return { success: true, data: giftCard };
    }
    giftCard = await giftCardProducts.create(bodyData);
    return { success: true, data: giftCard };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};
////updte card api
const updateCard = async (bodyData, card_id) => {
  try { 
    const findGiftCard = await giftCardProducts.findAll({
      where: {
        name: bodyData.name,
      },
    });
    if (findGiftCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let giftCard= await giftCardProducts.update(bodyData, {
      where: {
        id: card_id,
      },
    });
    return { success: true, data: giftCard };
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
    const giftCard = await giftCardProducts.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return giftCard;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};
const getCardDetails = async (card_id) => {
  try {
    const giftCard = await giftCardProducts.findAll({
      where: {
        id:card_id
      }
    });
    return giftCard;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveCard,
  updateCard,
  getCard,
  getCardDetails
};
