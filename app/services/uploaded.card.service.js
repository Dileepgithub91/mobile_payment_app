const logger = require("../logger");
const db = require("../models");

//Create Main Model
const UploadedCards = db.UploadedCards;

//Save Pan verification Data
const saveUploadedCards = async (bodyData) => {
  try {
    let card;
    ///find Card With Same name
    const findCard = await UploadedCards.findAll({
      where: {
        card_no: bodyData.card_no,
      },
    });
    if (findCard.length != 0) {
      throw new Error("Card with this number exists!");
    }
    card = await UploadedCards.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Cards Service  -- save Uploaded Cards",
      error,
    });
    return { success: false, data: error };
  }
};

////update card api
const updateUploadedCards = async (bodyData, cardId) => {
  try {
    const findCard = await UploadedCards.findAll({
      where: {
        id: cardId,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await UploadedCards.update(bodyData, {
      where: {
        id: cardId,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};

const getUploadedCards = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const card = await UploadedCards.findAll({
      limit: limitPage,
      offset: offset,
      where: query || {},
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Card",
      error,
    });
    throw error;
  }
};

const getUploadedCardsDetails = async (cardId) => {
  try {
    const card = await UploadedCards.findOne({
      where: {
        id: cardId,
      },
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Uploaded Card details",
      error,
    });
    throw error;
  }
};

module.exports = {
  getUploadedCards,
  getUploadedCardsDetails,
  saveUploadedCards,
  updateUploadedCards,
};
